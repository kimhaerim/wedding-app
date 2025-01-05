import { useCallback, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { formatCurrency } from "../../common/util";
import CategoryButton from "../../components/category/CategoryButton";
import FloatingButton from "../../components/common/FloatingButton";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { ICategory } from "../../interface/category.interface";
import { categoryMockData } from "../../mock/CheckListMockData";
import ConfirmModal from "../../modal/ConfirmModal";
import { CategoryStackParamList } from "../../navigation/interface";

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

interface CategoryListsScreenProps {
  navigation: StackNavigationProp<CategoryStackParamList, "CategoryHome" | "CategoryDetail">;
  route: RouteProp<CategoryStackParamList, "CategoryHome">;
}

export const CategoryListsScreen: React.FC<CategoryListsScreenProps> = ({ navigation }) => {
  const [userCategories, setUserCategories] = useState<ICategory[]>(categoryMockData);

  const [page, setPage] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const renderItem = useCallback(
    (item: ICategory) => {
      return (
        <ShadowView key={item.id}>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryDetail", { categoryId: item.id })}>
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
            </View>
            <Text style={{ marginBottom: 5 }}>예산 : {formatCurrency(item.budgetAmount)}</Text>
            <Text>연결된 체크리스트 : 2개</Text>
          </TouchableOpacity>
        </ShadowView>
      );
    },
    [userCategories]
  );

  const handleDefaultCategoryOnPress = useCallback(
    (category: string) => {
      navigation.navigate("EditCategory", { categoryTitle: category });
    },
    [navigation]
  );

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);

    // 추가 호출 API
    const newCategories: ICategory[] = [];

    if (newCategories.length > 0) {
      // setCosts((prevLists) => [...prevLists, ...newCheckLists]);
    }

    if (newCategories.length <= 10) {
      setPage(-1);
    }
  };

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>기본 카테고리 목록</Text>
        <Text style={{ fontSize: 12, marginTop: 10 }}>클릭 시 추가 가능합니다.</Text>

        <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
          {defaultCategories.map((category) => (
            <CategoryButton
              key={category}
              isPressed={true}
              onPress={() => handleDefaultCategoryOnPress(category)}
              label={category}
            ></CategoryButton>
          ))}
        </View>

        <Divider style={{ marginTop: 10 }} />

        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30, marginBottom: 10 }}>추가된 카테고리 목록</Text>

        <View>
          <FlatList
            data={userCategories}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => renderItem(item)}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>

      <FloatingButton onPress={() => navigation.navigate("EditCategory", {})} />

      <ConfirmModal
        title="카테고리를 정말 삭제하시겠습니까?"
        description="체크리스트와 비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </WhiteSafeAreaView>
  );
};
