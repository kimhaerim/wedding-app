import { useLazyQuery, useQuery } from "@apollo/client";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { calculateDday, convertDateToString, showErrorToast, showToast } from "../../common/util";
import { CategoryButton } from "../../components/category";
import CheckListItem from "../../components/check-list/CheckListItem";
import Button from "../../components/common/Button";
import FloatingButton from "../../components/common/FloatingButton";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { QueryGetCategories } from "../../graphql/category";
import { QueryGetCheckLists } from "../../graphql/checkList";
import { ICategory, ICheckList, ICouple } from "../../interface";
import { coupleMockData } from "../../mock/CheckListMockData";
import ConfirmModal from "../../modal/ConfirmModal";
import SelectDateModal from "../../modal/SelectDateModal";
import { CheckListStackParamList } from "../../navigation/interface";

interface CheckListsScreenProps {
  navigation: StackNavigationProp<CheckListStackParamList, "CheckListsHome">;
  route: RouteProp<CheckListStackParamList, "CheckListsHome">;
}

export const CheckListsScreen: React.FC<CheckListsScreenProps> = ({ navigation }) => {
  const {
    data: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<{ categories: ICategory[] }>(QueryGetCategories);

  const [getCheckLists] = useLazyQuery<
    { checkLists: ICheckList[] },
    { categoryId?: number; offset: number; limit: number }
  >(QueryGetCheckLists, { fetchPolicy: "network-only" });

  const today = dayjs();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [checkLists, setCheckLists] = useState<ICheckList[]>([]);
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [userCategories, setUserCategories] = useState<{ id: number; title: string }[]>([]);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const [weddingDate, setWeddingDate] = useState<Date | undefined>(couple.weddingDate ?? undefined);
  const [weddingDateVisible, setWeddingDateVisible] = useState<boolean>(false);

  useEffect(() => {
    if (categoryLoading) {
      return;
    }

    if (categoryError) {
      console.log(categoryError);
      showToast(categoryError.message, "error");
    }
    if (!categories) {
      showErrorToast();

      return;
    }

    console.log(categories.categories);
    setUserCategories([{ id: 0, title: "전체" }, ...categories.categories]);
  }, [categoryError, categories]);

  const handleChangeSelectedCategory = useCallback(
    (categoryId: number) => {
      setSelectedCategoryId(categoryId);
    },
    [selectedCategoryId]
  );

  useFocusEffect(
    useCallback(() => {
      const fetchCheckLists = async () => {
        try {
          const { data, error } = await getCheckLists({
            variables: {
              categoryId: selectedCategoryId === 0 ? undefined : selectedCategoryId,
              offset: 0,
              limit: 10,
            },
          });
          if (error) {
            showToast(error.message, "error");
          }
          if (data) {
            console.log(data.checkLists);
            setCheckLists(data.checkLists);
          }
        } catch (err) {
          showErrorToast();
        }
      };

      fetchCheckLists();
    }, [selectedCategoryId])
  );

  const handleMenuButtonPress = useCallback(
    (id: number | undefined) => {
      setCheckListId(id);
    },
    [checkListId]
  );

  const handleMenuItemPress = (action: string, id: number) => {
    const checkListId = id;
    switch (action) {
      case "view":
        navigation.push("CheckListDetail", { checkListId });
        break;

      case "edit":
        navigation.navigate("EditCheckList", { checkListId, isFromCategory: false });
        break;

      case "delete":
        setRemoveModalVisible(true);
        break;

      default:
        break;
    }

    setCheckListId(undefined);
  };

  const handleFloatingAddButtonPress = useCallback(() => {
    const isFromCategory = selectedCategoryId !== 0;

    navigation.navigate("EditCheckList", {
      isFromCategory,
      categoryId: selectedCategoryId === 0 ? undefined : selectedCategoryId,
    });
  }, [selectedCategoryId, navigation]);

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
              label={item.title}
              isPressed={item.id === selectedCategoryId}
              onPress={() => handleChangeSelectedCategory(item.id)}
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

      <FloatingButton onPress={handleFloatingAddButtonPress}></FloatingButton>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>

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
