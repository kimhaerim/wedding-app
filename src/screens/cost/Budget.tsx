import { FlatList, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import { Color } from "../../enum";

import { useState } from "react";
import CategoryButton from "../../components/category/CategoryButton";
import Button from "../../components/common/Button";
import CustomMenu from "../../components/common/Menu";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import BudgetSummaryRow from "../../components/cost/BudgetSummaryRow";
import { ICategory, ICategoryBudgetAmount } from "../../interface/category.interface";
import { ICostsByCategoryId } from "../../interface/cost.interface";
import { categoryMockData, costsByCategoryIdsMockData } from "../../mock/CheckListMockData";
import ConfirmModal from "../../modal/ConfirmModal";

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

const BudgetScreen = () => {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [combinedBudget, setCombinedBudget] = useState<ICategoryBudgetAmount>({
    totalBudgetAmount: 200000,
    paidBudgetAmount: 100000,
    unpaidBudgetAmount: 200000,
  });
  const [combinedCost, setCombinedCost] = useState<ICostsByCategoryId[]>(costsByCategoryIdsMockData);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const [categories, setCategories] = useState<ICategory[]>(categoryMockData);

  const handleMenuItemPress = (action: string, id: number) => {
    switch (action) {
      case "view":
        console.log("상세 보기", id);
        break;
      case "edit":
        console.log("수정", id);
        break;
      case "delete":
        console.log("삭제", id);
        setRemoveModalVisible(true);
        setCategoryId(undefined);
        break;
      default:
        break;
    }
  };

  const calculateRemainingBudget = (budgetAmount: number, paid: number, unpaid: number) => {
    return budgetAmount - (paid + unpaid);
  };

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);

    const newCombinedCost: ICostsByCategoryId[] = [];
    if (newCombinedCost.length > 0) {
      setCombinedCost((prevLists) => [...prevLists, ...newCombinedCost]);
    }

    if (newCombinedCost.length <= 10) {
      setPage(-1);
    }
  };

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 10 }}>
        {categories.length === 0 ? (
          <>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: Color.BLACK }}>
                현재 저장된 카테고리가 없어요.
              </Text>
              <Text style={{ fontSize: 15, color: Color.DARK_GRAY, marginTop: 10 }}>
                카테고리를 저장하고 현명한 예산 관리를 시작하세요!
              </Text>

              <Divider style={{ marginTop: 20, marginBottom: 20 }} />

              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>기본 카테고리 추가</Text>
                <Text style={{ fontSize: 14, color: "#666", marginTop: 5 }}>클릭하면 카테고리 추가가 가능해요.</Text>
              </View>

              <View style={{ marginTop: 15, flexDirection: "row", flexWrap: "wrap" }}>
                {defaultCategories.map((category) => (
                  <CategoryButton
                    key={category}
                    label={category}
                    isPressed={true}
                    onPress={() => console.log(`${category} 추가`)}
                  />
                ))}
              </View>

              <Divider style={{ marginTop: 20, marginBottom: 20 }} />

              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>카테고리 추가</Text>
              </View>

              <Button
                onPress={() => console.log("카테고리 직접 추가하기")}
                style={{
                  backgroundColor: Color.BLUE,
                  width: 200,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>카테고리 직접 추가하기</Text>
              </Button>
            </View>
          </>
        ) : (
          <>
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
                value={combinedBudget.totalBudgetAmount}
                iconSource="cash"
              ></BudgetSummaryRow>

              <BudgetSummaryRow
                label="총 비용"
                value={combinedBudget.paidBudgetAmount + combinedBudget.unpaidBudgetAmount}
                iconSource="currency-usd"
              ></BudgetSummaryRow>

              <Divider style={{ margin: 5 }} />

              <BudgetSummaryRow
                label="결제 금액"
                value={combinedBudget.paidBudgetAmount}
                iconSource="check-circle"
              ></BudgetSummaryRow>

              <BudgetSummaryRow
                label="결제 예정 금액"
                value={combinedBudget.unpaidBudgetAmount}
                iconSource="clock-outline"
              ></BudgetSummaryRow>

              <Divider style={{ margin: 5 }} />

              <BudgetSummaryRow
                label="남은 예산"
                value={calculateRemainingBudget(
                  combinedBudget.totalBudgetAmount,
                  combinedBudget.paidBudgetAmount,
                  combinedBudget.unpaidBudgetAmount
                )}
                iconSource="wallet-outline"
                valueStyle={{
                  fontWeight: "bold",
                  color:
                    calculateRemainingBudget(
                      combinedBudget.totalBudgetAmount,
                      combinedBudget.paidBudgetAmount,
                      combinedBudget.unpaidBudgetAmount
                    ) < 0
                      ? Color.RED
                      : Color.BLACK,
                }}
              ></BudgetSummaryRow>
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => {
                const categoryCost = combinedCost.find((cost) => cost.categoryId === item.id);
                return (
                  <ShadowView key={item.id}>
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>
                      <CustomMenu
                        visible={categoryId === item.id}
                        onDismiss={() => setCategoryId(undefined)}
                        onButtonPress={() => setCategoryId(item.id)}
                        onMenuItemPress={(action: string) => handleMenuItemPress(action, item.id)}
                      ></CustomMenu>
                    </View>

                    <BudgetSummaryRow label="총 예산" value={item.budgetAmount} iconSource="cash"></BudgetSummaryRow>

                    {categoryCost && (
                      <>
                        <BudgetSummaryRow
                          label="총 비용"
                          value={categoryCost.costs.totalCost}
                          iconSource="currency-usd"
                        ></BudgetSummaryRow>

                        <Divider style={{ margin: 5 }} />
                        <BudgetSummaryRow
                          label="결제 금액"
                          value={categoryCost.costs.paidCost}
                          iconSource="check-circle"
                        ></BudgetSummaryRow>

                        <BudgetSummaryRow
                          label="결제 예정 금액"
                          value={categoryCost.costs.unpaidCost}
                          iconSource="clock-outline"
                        ></BudgetSummaryRow>

                        <Divider style={{ margin: 5 }} />

                        <BudgetSummaryRow
                          label="남은 예산"
                          value={calculateRemainingBudget(
                            item.budgetAmount,
                            categoryCost.costs.paidCost,
                            categoryCost.costs.unpaidCost
                          )}
                          iconSource="wallet-outline"
                          valueStyle={{
                            color:
                              calculateRemainingBudget(
                                item.budgetAmount,
                                categoryCost.costs.paidCost,
                                categoryCost.costs.unpaidCost
                              ) < 0
                                ? Color.RED
                                : Color.BLACK,
                            fontWeight: "bold",
                          }}
                        ></BudgetSummaryRow>
                      </>
                    )}
                  </ShadowView>
                );
              }}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
            />
          </>
        )}
      </View>

      <ConfirmModal
        title="카테고리를 정말 삭제하시겠습니까?"
        description="체크리스트와 비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </WhiteSafeAreaView>
  );
};

export default BudgetScreen;
