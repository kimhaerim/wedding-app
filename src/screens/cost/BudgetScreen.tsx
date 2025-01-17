import { FlatList, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import { Color } from "../../enum";

import { useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import CategoryButton from "../../components/category/CategoryButton";
import Button from "../../components/common/Button";
import FloatingButton from "../../components/common/FloatingButton";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import BudgetSummaryRow from "../../components/cost/BudgetSummaryRow";
import { QueryGetCategories, QueryGetTotalCategoryBudget } from "../../graphql/category";
import { ICategory, ICategoryBudgetDetails, IGetCategoryVariables } from "../../interface/category.interface";
import ConfirmModal from "../../modal/ConfirmModal";
import { BudgetStackParamList } from "../../navigation/interface/BudgetStackParamList";

const defaultCategories = [
  "🏩 웨딩홀",
  "📸 스튜디오",
  "👗 드레스",
  "💍 예물",
  "🕴 신랑 예복",
  "✈️ 신혼 여행",
  "💄 메이크업",
  "🌅 스냅 촬영",
];

interface BudgetScreenProps {
  navigation: StackNavigationProp<BudgetStackParamList, "BudgetHome">;
  route: RouteProp<BudgetStackParamList, "BudgetHome">;
}

const LIMIT = 10;
export const BudgetScreen: React.FC<BudgetScreenProps> = ({ navigation }) => {
  const fromNavigator = "BudgetHome";
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [userCategories, setUserCategories] = useState<ICategory[]>([]);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const { loading } = useQuery<{ categories: ICategory[] }, IGetCategoryVariables>(QueryGetCategories, {
    variables: { offset: page * LIMIT, limit: LIMIT },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (page === 0) {
        setUserCategories(data.categories);
      } else if (page > 0) {
        setUserCategories((prev) => [...prev, ...data.categories]);
      }

      if (data.categories.length >= LIMIT) {
        setHasMore(true);
      } else if (data.categories.length < LIMIT) {
        setHasMore(false);
      }
    },
  });

  const { data: categoryBudgetAmount } = useQuery<{ totalCategoryBudget: ICategoryBudgetDetails }>(
    QueryGetTotalCategoryBudget,
    { fetchPolicy: "network-only" }
  );

  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) {
      return;
    }

    setPage((prevPage) => prevPage + 1);
  }, [loading, hasMore]);

  const handleDefaultCategoryOnPress = useCallback(
    (category: string) => {
      navigation.navigate("EditCategory", { categoryTitle: category, fromNavigator });
    },
    [navigation]
  );

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 10, flex: 1 }}>
        {userCategories.length === 0 ? (
          <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.BLACK }}>현재 저장된 카테고리가 없어요.</Text>
            <Text style={{ fontSize: 15, color: Color.DARK_GRAY, marginTop: 10 }}>
              카테고리를 저장하고 현명한 예산 관리를 시작하세요!
            </Text>

            <Divider style={{ marginTop: 20, marginBottom: 20 }} />

            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>기본 카테고리 저장</Text>
              <Text style={{ fontSize: 14, color: "#666", marginTop: 5 }}>클릭하면 카테고리 저장 가능해요.</Text>
            </View>

            <View style={{ marginTop: 15, flexDirection: "row", flexWrap: "wrap" }}>
              {defaultCategories.map((category) => (
                <CategoryButton
                  key={category}
                  label={category}
                  isPressed={true}
                  onPress={() => handleDefaultCategoryOnPress(category)}
                />
              ))}
            </View>

            <Divider style={{ marginTop: 20, marginBottom: 20 }} />

            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>카테고리 저장</Text>
            </View>

            <Button
              onPress={() => navigation.navigate("EditCategory", { fromNavigator })}
              style={{
                backgroundColor: Color.BLUE,
                width: 200,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>카테고리 직접 저장하기</Text>
            </Button>
          </View>
        ) : (
          <>
            {categoryBudgetAmount?.totalCategoryBudget && (
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: Color.BLUE100,
                }}
              >
                <BudgetSummaryRow
                  label="총 예산"
                  value={categoryBudgetAmount.totalCategoryBudget.budgetAmount}
                  iconSource="cash"
                ></BudgetSummaryRow>

                <BudgetSummaryRow
                  label="총 비용"
                  value={categoryBudgetAmount.totalCategoryBudget.budgetAmount}
                  iconSource="currency-usd"
                ></BudgetSummaryRow>

                <Divider style={{ margin: 5 }} />

                <BudgetSummaryRow
                  label="결제 금액"
                  value={categoryBudgetAmount.totalCategoryBudget.paidCost}
                  iconSource="check-circle"
                ></BudgetSummaryRow>

                <BudgetSummaryRow
                  label="결제 예정 금액"
                  value={categoryBudgetAmount.totalCategoryBudget.unpaidCost}
                  iconSource="clock-outline"
                ></BudgetSummaryRow>

                <Divider style={{ margin: 5 }} />

                <BudgetSummaryRow
                  label="남은 예산"
                  value={categoryBudgetAmount.totalCategoryBudget.remainingBudget}
                  iconSource="wallet-outline"
                  valueStyle={{
                    fontWeight: "bold",
                    color: categoryBudgetAmount.totalCategoryBudget.remainingBudget < 0 ? Color.RED : Color.BLACK,
                  }}
                ></BudgetSummaryRow>
              </View>
            )}

            {userCategories && (
              <FlatList
                data={userCategories}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => {
                  return (
                    <ShadowView key={item.id}>
                      <TouchableOpacity onPress={() => navigation.navigate("CategoryDetail", { categoryId: item.id })}>
                        <Text style={{ fontWeight: "bold", fontSize: 15, marginVertical: 5 }}>{item.title}</Text>

                        <Text style={{ marginVertical: 5 }}>연결된 체크리스트 : 2개</Text>
                        <BudgetSummaryRow
                          label="총 예산"
                          value={item.budgetAmount}
                          iconSource="cash"
                        ></BudgetSummaryRow>

                        {item.categoryBudgetDetails && (
                          <>
                            <BudgetSummaryRow
                              label="총 비용"
                              value={item.categoryBudgetDetails.totalCost}
                              iconSource="currency-usd"
                            ></BudgetSummaryRow>

                            <Divider style={{ margin: 5 }} />
                            <BudgetSummaryRow
                              label="결제 금액"
                              value={item.categoryBudgetDetails.paidCost}
                              iconSource="check-circle"
                            ></BudgetSummaryRow>

                            <BudgetSummaryRow
                              label="결제 예정 금액"
                              value={item.categoryBudgetDetails.unpaidCost}
                              iconSource="clock-outline"
                            ></BudgetSummaryRow>

                            <Divider style={{ margin: 5 }} />

                            <BudgetSummaryRow
                              label="남은 예산"
                              value={item.categoryBudgetDetails.remainingBudget}
                              iconSource="wallet-outline"
                              valueStyle={{
                                color: item.categoryBudgetDetails.remainingBudget < 0 ? Color.RED : Color.BLACK,
                                fontWeight: "bold",
                              }}
                            ></BudgetSummaryRow>
                          </>
                        )}
                      </TouchableOpacity>
                    </ShadowView>
                  );
                }}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
              />
            )}
          </>
        )}
      </View>

      <ConfirmModal
        title="카테고리를 정말 삭제하시겠습니까?"
        description="체크리스트와 비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
      <FloatingButton onPress={() => navigation.navigate("EditCategory", { fromNavigator })} />
    </WhiteSafeAreaView>
  );
};
