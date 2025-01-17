import React, { useCallback, useState } from "react";
import { ICategory } from "../../interface/category.interface";

import { FlatList, View } from "react-native";

import { Text } from "react-native-paper";

import { useQuery } from "@apollo/client";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CheckListWithCostItem from "../../components/check-list/CheckListWithCostItem";
import EditDeleteButtons from "../../components/common/EditDeleteButtons";
import FloatingButton from "../../components/common/FloatingButton";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import BudgetSummary from "../../components/cost/BudgetSummary";
import { QueryGetCategory } from "../../graphql/category";
import ConfirmModal from "../../modal/ConfirmModal";
import { CategoryStackParamList } from "../../navigation/interface";

interface CategoryScreenProps {
  navigation: StackNavigationProp<
    CategoryStackParamList,
    "CategoryDetail" | "EditCategory" | "CheckListDetail" | "EditCheckList"
  >;
  route: RouteProp<CategoryStackParamList, "CategoryDetail">;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route }) => {
  const { categoryId } = route.params;

  const { data, refetch } = useQuery<{ category: ICategory }, { id: number }>(QueryGetCategory, {
    variables: { id: categoryId },
    fetchPolicy: "network-only",
  });

  const checkListCount = 1;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );
  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const [removeCategoryModalVisible, setRemoveCategoryModalVisible] = useState<boolean>(false);

  const handleMenuButtonPress = (id: number | undefined) => {
    setCheckListId(id);
  };

  const handleMenuItemPress = (action: string, id: number) => {
    switch (action) {
      case "view":
        navigation.navigate("CheckListDetail", { checkListId: id });
        break;
      case "edit":
        navigation.navigate("EditCheckList", { checkListId: id, isFromCategory: true, categoryId });
        break;
      case "delete":
        setRemoveModalVisible(true);
        break;
      default:
        break;
    }

    setCheckListId(undefined);
  };

  const handleEditButtonPress = useCallback(() => {
    navigation.navigate("EditCategory", { categoryId });
  }, [categoryId]);

  return (
    <WhiteSafeAreaView>
      {data && (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20, marginTop: 10 }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.category.title}</Text>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 10 }}>{`${checkListCount}개`}</Text>
          </View>
          <BudgetSummary
            category={{
              budgetAmount: data.category.budgetAmount,
              remainingBudget: data.category.categoryBudgetDetails?.remainingBudget ?? 0,
            }}
            combinedCost={data.category.categoryBudgetDetails ?? { totalCost: 0, paidCost: 0, unpaidCost: 0 }}
          />
          <EditDeleteButtons
            onEditButtonPress={handleEditButtonPress}
            onRemoveButtonPress={() => setRemoveCategoryModalVisible(true)}
          />
          <FlatList
            data={data.category.checkList}
            keyExtractor={(item) => `category-${item.id}`}
            renderItem={({ item }) => (
              <CheckListWithCostItem
                checkList={item}
                checkListId={checkListId}
                onCheckListPress={() => console.log(item.id)}
                onMenuButtonPress={handleMenuButtonPress}
                onMenuItemPress={handleMenuItemPress}
              />
            )}
          />
        </>
      )}

      <FloatingButton
        onPress={() => navigation.navigate("EditCheckList", { categoryId, isFromCategory: true })}
      ></FloatingButton>

      <ConfirmModal
        title="카데고리를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeCategoryModalVisible}
        hideModal={() => setRemoveCategoryModalVisible(false)}
      ></ConfirmModal>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </WhiteSafeAreaView>
  );
};
