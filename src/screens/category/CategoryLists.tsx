import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { Color } from "../../enum";
import { ICategory } from "../../interface/category.interface";
import { Button, Divider, Icon, Menu, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import ConfirmModal from "../../modal/ConfirmModal";
import CategoryButton from "../../components/category/CategoryButton";
import { categoryMockData } from "../../mock/CheckListMockData";
import ShadowView from "../../components/common/ShadowView";
import { formatCurrency } from "../../common/util";
import CustomMenu from "../../components/common/Menu";

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

const CategoryLists = () => {
  const [userCategories, setUserCategories] = useState<ICategory[]>(categoryMockData);

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

  return (
    <CenteredSafeArea>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>카테고리</Text>
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
        <ScrollView>
          <View>
            {userCategories.map((category) => (
              <ShadowView key={category.id}>
                <View
                  key={category.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>{category.title}</Text>
                  <CustomMenu
                    visible={categoryId === category.id}
                    onDismiss={() => setCategoryId(undefined)}
                    onButtonPress={() => setCategoryId(category.id)}
                    onMenuItemPress={(action: string) => handleMenuItemPress(action, category.id)}
                  ></CustomMenu>
                </View>
                <Text style={{ marginBottom: 5 }}>예산 : {formatCurrency(category.budgetAmount)}</Text>
                <Text>연결된 체크리스트 : 2개</Text>
              </ShadowView>
            ))}
          </View>
        </ScrollView>
      </View>

      <ConfirmModal
        title="카테고리를 정말 삭제하시겠습니까?"
        description="체크리스트와 비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </CenteredSafeArea>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
});

export default CategoryLists;
