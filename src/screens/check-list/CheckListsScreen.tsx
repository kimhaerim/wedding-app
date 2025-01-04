import dayjs from "dayjs";
import React, { useState } from "react";
import { ICheckList, ICouple } from "../../interface";
import { checkListMockData, coupleMockData, userCategoriesMockData } from "../../mock/CheckListMockData";
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { calculateDday, convertDateToString } from "../../common/util";
import Button from "../../components/common/Button";
import { CategoryButton } from "../../components/category";
import ShadowView from "../../components/common/ShadowView";
import CheckListItem from "../../components/check-list/CheckListItem";
import ConfirmModal from "../../modal/ConfirmModal";
import FloatingButton from "../../components/common/FloatingButton";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import SelectDateModal from "../../modal/SelectDateModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { CheckListStackParamList } from "../../navigation/types";
import { RouteProp, useNavigation } from "@react-navigation/native";
import BottomButton from "../../components/common/BottomButton";

type CheckListsNavigationProp = StackNavigationProp<CheckListStackParamList, "CheckListsHome">;
type CheckListsRouteProp = RouteProp<CheckListStackParamList, "CheckListsHome">;

interface CheckListsScreenProps {
  navigation: CheckListsNavigationProp;
  route: CheckListsRouteProp;
}

const CheckListsScreen: React.FC<CheckListsScreenProps> = ({ navigation }) => {
  const today = dayjs();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [checkLists, setCheckLists] = useState<ICheckList[]>(checkListMockData);
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [userCategories, setUserCategories] = useState<{ id: number; category: string }[]>(userCategoriesMockData);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const [weddingDate, setWeddingDate] = useState<Date | undefined>(couple.weddingDate ?? undefined);
  const [weddingDateVisible, setWeddingDateVisible] = useState<boolean>(false);

  const handleMenuButtonPress = (id: number | undefined) => {
    setCheckListId(id);
  };

  const handleMenuItemPress = (action: string, id: number) => {
    switch (action) {
      case "view":
        navigation.push("CheckListDetail", { id });
        break;

      case "edit":
        navigation.navigate("EditCheckList", { checkListId: id, isFromCategory: false });
        break;

      case "delete":
        setRemoveModalVisible(true);
        break;

      default:
        break;
    }

    setCheckListId(undefined);
  };

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);

    // 추가 호출 API
    const newCheckLists: ICheckList[] = [];

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
          {weddingDate ? (
            <>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ marginRight: 10 }}>결혼식까지</Text>
                <Text>D{calculateDday(weddingDate, today)}</Text>
              </View>
              <Text>{convertDateToString(weddingDate)} </Text>
            </>
          ) : (
            <Button style={{ marginBottom: 20 }} onPress={() => setWeddingDateVisible(true)}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>결혼 예정일 등록하기</Text>
            </Button>
          )}
        </View>

        <FlatList
          data={userCategories}
          keyExtractor={(item) => `category-${item.id}`}
          renderItem={({ item }) => (
            <CategoryButton
              key={item.id}
              label={item.category}
              isPressed={item.id === selectedCategory}
              onPress={() => setSelectedCategory(item.id)}
            ></CategoryButton>
          )}
          horizontal={true}
        />
      </View>

      <View style={{ flex: 1, margin: 10 }}>
        <FlatList
          data={checkLists}
          keyExtractor={(item) => `checkList-${item.id}`}
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

      <BottomButton label="체크리스트 추가" disabled={false} onPress={() => console.log("ddd")} />

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>

      {/* <FloatingButton
        onPress={() => navigation.navigate("EditCheckList", { checkListId: undefined, isFromCategory: false })}
      ></FloatingButton> */}

      <SelectDateModal
        title="결혼 예정일 등록하기"
        visible={weddingDateVisible}
        dateValue={weddingDate}
        onDateChange={setWeddingDate}
        hideModal={() => setWeddingDateVisible(false)}
      ></SelectDateModal>
    </WhiteSafeAreaView>
  );
};

export default CheckListsScreen;
