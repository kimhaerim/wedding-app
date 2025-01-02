import { useState } from "react";

import { ICategory } from "../../interface/category.interface";
import { Divider, Text } from "react-native-paper";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import ConfirmModal from "../../modal/ConfirmModal";
import CategoryButton from "../../components/category/CategoryButton";
import { categoryMockData } from "../../mock/CheckListMockData";
import ShadowView from "../../components/common/ShadowView";
import { formatCurrency } from "../../common/util";
import CustomMenu from "../../components/common/Menu";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";

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

const CategoryListsScreen = () => {
  const [userCategories, setUserCategories] = useState<ICategory[]>(categoryMockData);

  const [page, setPage] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

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
              onPress={() => console.log(category)}
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
            renderItem={({ item }) => (
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
                <Text style={{ marginBottom: 5 }}>예산 : {formatCurrency(item.budgetAmount)}</Text>
                <Text>연결된 체크리스트 : 2개</Text>
              </ShadowView>
            )}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
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

export default CategoryListsScreen;
