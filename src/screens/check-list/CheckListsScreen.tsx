import dayjs from "dayjs";
import { useState } from "react";
import { ICheckListTemp, ICouple } from "../../interface";
import { checkListMockData, coupleMockData, userCategoriesMockData } from "../../mock/CheckListMockData";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { calculateDday, convertDateToString } from "../../common/util";
import Button from "../../components/common/Button";
import { CategoryButton } from "../../components/category";
import ShadowView from "../../components/common/ShadowView";
import CheckListItem from "../../components/check-list/CheckListItem";
import ConfirmModal from "../../modal/ConfirmModal";
import FloatingButton from "../../components/common/FloatingButton";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";

const CheckListsScreen = () => {
  const today = dayjs();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [checkLists, setCheckLists] = useState<ICheckListTemp[]>(checkListMockData);
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [userCategories, setUserCategories] = useState<{ id: number; category: string }[]>(userCategoriesMockData);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const handleMenuButtonPress = (id: number | undefined) => {
    setCheckListId(id);
  };

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
        setCheckListId(undefined);
        break;
      default:
        break;
    }
  };

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);

    // 추가 호출 API
    const newCheckLists: ICheckListTemp[] = [];

    if (newCheckLists.length > 0) {
      setCheckLists((prevLists) => [...prevLists, ...newCheckLists]);
    }

    if (newCheckLists.length <= 10) {
      setPage(-1);
    }
  };

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 10, marginBottom: 0 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {couple.weddingDate ? (
            <>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ marginRight: 10 }}>결혼식까지</Text>
                <Text>D{calculateDday(couple.weddingDate, today)}</Text>
              </View>
              <Text>{convertDateToString(couple.weddingDate)} </Text>
            </>
          ) : (
            <Button style={{ marginBottom: 20 }} onPress={() => console.log("")}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>결혼 예정일 등록하기</Text>
            </Button>
          )}
        </View>

        <ScrollView horizontal={true} style={{ width: "100%" }}>
          {userCategories.map((category) => (
            <CategoryButton
              key={category.id}
              label={category.category}
              isPressed={category.id === selectedCategory}
              onPress={() => setSelectedCategory(category.id)}
            ></CategoryButton>
          ))}
        </ScrollView>
      </View>

      <View style={{ height: "100%", margin: 10 }}>
        <FlatList
          data={checkLists}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <ShadowView>
              <CheckListItem
                item={item}
                checkListId={checkListId}
                onMenuButtonPress={handleMenuButtonPress}
                onMenuItemPress={handleMenuItemPress}
              />
            </ShadowView>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        />
      </View>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>

      <FloatingButton onPress={() => console.log()}></FloatingButton>
    </WhiteSafeAreaView>
  );
};

export default CheckListsScreen;
