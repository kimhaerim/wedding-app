import React, { useCallback, useState } from "react";
import BackButton from "../../components/common/BackButton";
import { ICategory } from "../../interface/category.interface";
import { Color } from "../../enum";

import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { Divider, Icon, Text } from "react-native-paper";

import Row from "../../components/common/Row";
import ConfirmModal from "../../modal/ConfirmModal";
import CheckListWithCostItem from "../../components/check-list/CheckListWithCostItem";
import { checkListMockData } from "../../mock/CheckListMockData";
import { formatCurrency } from "../../common/util";
import { ICostByCheckList } from "../../interface/cost.interface";
import FloatingButton from "../../components/common/FloatingButton";
import { CategoryStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import Button from "../../components/common/Button";
import CustomMenu from "../../components/common/Menu";
import EditDeleteButtons from "../../components/common/EditDeleteButtons";
import BudgetSummaryRow from "../../components/cost/BudgetSummaryRow";
import BudgetSummary from "../../components/cost/BudgetSummary";

type CategoryNavigationProp = StackNavigationProp<
  CategoryStackParamList,
  "CategoryDetail" | "EditCategory" | "CheckListDetail"
>;
type CategoryRouteProp = RouteProp<CategoryStackParamList, "CategoryDetail" | "EditCategory" | "CheckListDetail">;

interface CategoryScreenProps {
  navigation: CategoryNavigationProp;
  route: CategoryRouteProp;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;

  const checkListCount = 1;

  const [category, setCategory] = useState<ICategory>({
    id: 1,
    title: "본식DVD",
    budgetAmount: 0,
    checkList: checkListMockData,
  });

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
  const [removeCategoryModalVisible, setRemoveCategoryModalVisible] = useState<boolean>(false);
  const [combinedCost, setCombinedCost] = useState<ICostByCheckList>({
    totalCost: 200000,
    paidCost: 100000,
    unpaidCost: 100000,
  });

  const handleMenuButtonPress = (id: number | undefined) => {
    setCheckListId(id);
  };

  const handleMenuItemPress = (action: string, id: number) => {
    switch (action) {
      case "view":
        navigation.navigate("CheckListDetail", { id });
        break;
      case "edit":
        console.log("수정", id);
        break;
      case "delete":
        console.log("삭제", id);
        setRemoveModalVisible(true);

        break;
      default:
        break;
    }

    setCheckListId(undefined);
  };

  const handleEditButtonPress = useCallback(() => {
    console.log(id, category.title);
    navigation.navigate("EditCategory", { id: id, title: category.title });
  }, [id]);

  return (
    <WhiteSafeAreaView>
      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20, marginTop: 10 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{category.title}</Text>
        </View>
        <Text style={{ marginLeft: 10, fontSize: 10 }}>{`${checkListCount}개`}</Text>
      </View>

      <BudgetSummary category={category} combinedCost={combinedCost} />

      <EditDeleteButtons
        onEditButtonPress={handleEditButtonPress}
        onRemoveButtonPress={() => setRemoveCategoryModalVisible(true)}
      />

      <ScrollView>
        <View style={{ margin: 10 }}>
          {category.checkList.map((checkList) => (
            <CheckListWithCostItem
              key={`checkList-${checkList.id}`}
              checkList={checkList}
              checkListId={checkListId}
              onCheckListPress={() => console.log(checkList.id)}
              onMenuButtonPress={handleMenuButtonPress}
              onMenuItemPress={handleMenuItemPress}
            />
          ))}
        </View>
      </ScrollView>

      <FloatingButton onPress={() => console.log("추가하기 클릭")}></FloatingButton>

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

export default CategoryScreen;
