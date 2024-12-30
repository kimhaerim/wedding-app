import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import { ICategory } from "../../interface/category.interface";
import { Color } from "../../enum";

import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";

import { Divider, Icon, Text } from "react-native-paper";

import Row from "../../components/common/Row";
import ConfirmModal from "../../modal/ConfirmModal";
import CheckListWithCostItem from "../../components/check-list/CheckListWithCostItem";
import { checkListMockData1 } from "../../mock/CheckListMockData";
import { formatCurrency } from "../../common/util";
import { ICostByCheckList } from "../../interface/cost.interface";
import FloatingButton from "../../components/common/FloatingButton";

const CategoryScreen = () => {
  const checkListCount = 1;

  const [category, setCategory] = useState<ICategory>({
    id: 1,
    title: "본식DVD",
    budgetAmount: 0,
    checkList: checkListMockData1,
  });

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton label={"카테고리"} onPress={() => console.log("뒤로 가기")} />

      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20, marginTop: 10 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Color.BLUE100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>📸</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{category.title}</Text>
        </View>
        <Text style={{ marginLeft: 10, fontSize: 10 }}>{`${checkListCount}개`}</Text>
      </View>

      <View
        style={{
          margin: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Color.BLUE100,
        }}
      >
        <Row style={{ marginBottom: 5 }}>
          <Icon color={Color.DARK_GRAY} source="cash" size={15} />
          <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>총 예산</Text>
          <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
            {formatCurrency(category.budgetAmount)}
          </Text>
        </Row>

        <Row style={{ marginBottom: 5 }}>
          <Icon color={Color.DARK_GRAY} source="currency-usd" size={15} />
          <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>총 비용</Text>
          <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
            {formatCurrency(combinedCost.totalCost)}
          </Text>
        </Row>

        <Divider style={{ margin: 5 }} />
        <Row style={{ marginBottom: 5 }}>
          <Icon color={Color.DARK_GRAY} source="check-circle" size={15} />
          <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>결제 금액</Text>
          <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
            {formatCurrency(combinedCost.paidCost)}
          </Text>
        </Row>

        <Row style={{ marginBottom: 5 }}>
          <Icon color={Color.DARK_GRAY} source="clock-outline" size={15} />
          <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>결제 예정 금액</Text>
          <Text style={{ fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 }}>
            {formatCurrency(combinedCost.unpaidCost)}
          </Text>
        </Row>

        <Divider />

        <Row style={{ marginTop: 5 }}>
          <Icon color={Color.DARK_GRAY} source="wallet-outline" size={15} />
          <Text style={{ marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" }}>남은 예산</Text>
          <Text
            style={{
              fontSize: 13,
              flex: 1,
              textAlign: "right",
              marginRight: 15,
              fontWeight: "bold",
            }}
          >
            {formatCurrency(category.budgetAmount - combinedCost.totalCost)}
          </Text>
        </Row>
      </View>

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
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </SafeAreaView>
  );
};

export default CategoryScreen;
