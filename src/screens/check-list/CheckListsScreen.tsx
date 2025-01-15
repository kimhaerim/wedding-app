import { useQuery } from "@apollo/client";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { calculateDday, convertDateToString } from "../../common/util";
import { CategoryButton } from "../../components/category";
import CheckListItem from "../../components/check-list/CheckListItem";
import Button from "../../components/common/Button";
import FloatingButton from "../../components/common/FloatingButton";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { QueryGetCategories } from "../../graphql/category";
import { QueryGetCheckLists } from "../../graphql/checkList";
import { ICategory, ICheckList, ICouple, IGetCategoryVariables, IGetCheckListVariables } from "../../interface";
import { coupleMockData } from "../../mock/CheckListMockData";
import ConfirmModal from "../../modal/ConfirmModal";
import SelectDateModal from "../../modal/SelectDateModal";
import { CheckListStackParamList } from "../../navigation/interface";

interface CheckListsScreenProps {
  navigation: StackNavigationProp<CheckListStackParamList, "CheckListsHome">;
  route: RouteProp<CheckListStackParamList, "CheckListsHome">;
}

const LIMIT = 10;
export const CheckListsScreen: React.FC<CheckListsScreenProps> = ({ navigation }) => {
  const [categoryPage, setCategoryPage] = useState<number>(0);
  const [categoryHasMore, setCategoryHasMore] = useState<boolean>(false);
  const [userCategories, setUserCategories] = useState<{ id: number; title: string }[]>([]);

  const { loading: categoryLoading } = useQuery<{ categories: ICategory[] }, IGetCategoryVariables>(
    QueryGetCategories,
    {
      variables: { offset: categoryPage * LIMIT, limit: LIMIT },
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        const defaultCategory = { id: 0, title: "전체" };
        if (categoryPage === 0) {
          setUserCategories([defaultCategory, ...data.categories]);
        } else if (categoryPage > 0) {
          setUserCategories((prev) => [...prev, ...data.categories]);
        }

        if (data.categories.length >= LIMIT) {
          setCategoryHasMore(true);
        } else if (data.categories.length < LIMIT) {
          setCategoryHasMore(false);
        }
      },
    }
  );

  const loadCategoryMoreData = useCallback(() => {
    if (categoryLoading || !categoryHasMore) {
      return;
    }

    setCategoryPage((prevPage) => prevPage + 1);
  }, [categoryLoading, categoryHasMore]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [checkListPage, setCheckListPage] = useState<number>(0);
  const [checkListHasMore, setCheckListHasMore] = useState<boolean>(true);

  const { loading: queryLoading, refetch } = useQuery<{ checkLists: ICheckList[] }, IGetCheckListVariables>(
    QueryGetCheckLists,
    {
      variables: {
        offset: checkListPage * LIMIT,
        limit: LIMIT,
        categoryId: selectedCategoryId === 0 ? undefined : selectedCategoryId,
      },
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (checkListPage === 0) {
          setCheckLists(data.checkLists);
        } else if (checkListPage > 0) {
          setCheckLists((prev) => [...prev, ...data.checkLists]);
        }

        if (data.checkLists.length >= LIMIT) {
          setCheckListHasMore(true);
        } else if (data.checkLists.length < LIMIT) {
          setCheckListHasMore(false);
        }
      },
    }
  );

  const today = dayjs();

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [checkLists, setCheckLists] = useState<ICheckList[]>([]);
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const [weddingDate, setWeddingDate] = useState<Date | undefined>(couple.weddingDate ?? undefined);
  const [weddingDateVisible, setWeddingDateVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const handleChangeSelectedCategory = useCallback(
    (categoryId: number) => {
      setCheckListPage(0);
      setSelectedCategoryId(categoryId);
    },
    [selectedCategoryId]
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

  const loadCheckListMoreData = useCallback(() => {
    if (queryLoading || !checkListHasMore) {
      return;
    }

    setCheckListPage((prevPage) => prevPage + 1);
  }, [queryLoading, checkListHasMore]);

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
          onEndReached={loadCategoryMoreData}
          onEndReachedThreshold={0.1}
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
          onEndReached={loadCheckListMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={queryLoading ? <ActivityIndicator /> : null}
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
