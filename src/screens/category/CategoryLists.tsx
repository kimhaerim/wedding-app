import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { Color } from "../../enum";
import { ICategory } from "../../interface/category.interface";
import { Button, Divider, Icon, Menu, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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

const CategoryLists = () => {
  const [userCategories, setUserCategories] = useState<ICategory[]>([
    { id: 1, title: "본식DVD", budgetAmount: 100000, checkList: [] },
    { id: 2, title: "본식DVD1", budgetAmount: 0, checkList: [] },
  ]);

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const handleRemoveModal = () => {
    setRemoveModalVisible(true);
    setCategoryId(undefined);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(amount);
  };

  return (
    <CenteredSafeArea>
      <BackButton label="카테고리 목록" onPress={() => console.log("뒤로 가기")}></BackButton>
      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 10 }}>기본 카테고리 목록</Text>
      <Text style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}>클릭 시 추가 가능합니다.</Text>

      <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {defaultCategories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              {
                backgroundColor: userCategories.map((category) => category.title).includes(category)
                  ? Color.BLUE
                  : Color.BLUE100,
                paddingHorizontal: category.length > 3 ? 15 : 10,
              },
            ]}
            onPress={() => {
              console.log("추가");
            }}
          >
            <Text style={{ color: Color.BLACK }}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 30, marginBottom: 20 }}>
        이미 추가된 카테고리 목록
      </Text>

      <Divider />

      <View style={{ marginLeft: 20, marginRight: 20 }}>
        {userCategories.map((category) => (
          <>
            <View
              key={category.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>{category.title}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginRight: 8 }}>{formatCurrency(category.budgetAmount)}</Text>
                <Menu
                  visible={categoryId === category.id}
                  onDismiss={() => setCategoryId(undefined)}
                  anchor={
                    <Button onPress={() => setCategoryId(category.id)} textColor={Color.BLACK}>
                      <Icon source="menu" size={13} />
                    </Button>
                  }
                  contentStyle={{ backgroundColor: Color.WHITE }}
                >
                  <Menu.Item leadingIcon="eye" onPress={() => console.log("상세 보기")} title="상세 보기" />
                  <Divider />
                  <Menu.Item leadingIcon="pencil" onPress={() => console.log("수정")} title="수정" />
                  <Menu.Item leadingIcon="delete" onPress={handleRemoveModal} title="삭제" />
                </Menu>
              </View>
            </View>
            <Divider />
          </>
        ))}
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
