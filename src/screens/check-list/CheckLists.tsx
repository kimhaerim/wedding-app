import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { ICategory } from "../../interface/category.interface";
import { CheckListStatus, Color, CostType } from "../../enum";
import CheckBox from "../../components/CheckBox";
import { ScrollView, View } from "react-native";

import dayjs from "dayjs";
import HorizontalLine from "../../components/HorizontalLine";
import { Button, Divider, Drawer, Icon, Menu, Text } from "react-native-paper";
import BottomButton from "../../components/BottomButton";
import Row from "../../components/Row";
import ConfirmModal from "../../modal/ConfirmModal";

const convertCheckListStatus = (status: CheckListStatus) => {
  switch (status) {
    case CheckListStatus.PENDING:
      return "보류";
    case CheckListStatus.CONFIRMED:
      return "✔️ 확정";
    case CheckListStatus.REJECTED:
      return "❌ 탈락";
  }
};

const covertCostType = (costType: CostType) => {
  switch (costType) {
    case CostType.BASE:
      return "기본금";
    case CostType.ADDITIONAL:
      return "✚ 추가금";
  }
};

const CheckLists = () => {
  const checkListCount = 1;

  const [category, setCategory] = useState<ICategory>({
    id: 1,
    title: "본식DVD",
    budgetAmount: 0,
    checkList: [
      {
        id: 1,
        description: "사진보라",
        isCompleted: true,
        memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
        reservedDate: new Date(),
        status: CheckListStatus.CONFIRMED,
        costs: [
          {
            id: 1,
            title: "계약금 결제",
            amount: 100000,
            costType: CostType.BASE,
            memo: "어쩌구 저쩌구 몰래몰래",
            paymentDate: new Date(),
          },
          { id: 2, title: "2부 연회장 결제", amount: 100000, costType: CostType.ADDITIONAL },
        ],
      },
      {
        id: 2,
        description: "사진보라",
        isCompleted: false,
        memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
        reservedDate: new Date(),
        status: CheckListStatus.REJECTED,
        costs: [
          {
            id: 1,
            title: "계약금 결제",
            amount: 100000,
            costType: CostType.BASE,
            memo: "어쩌구 저쩌구 몰래몰래",
            paymentDate: new Date(),
          },
          { id: 2, title: "2부 연회장 결제", amount: 100000, costType: CostType.ADDITIONAL },
        ],
      },
    ],
  });

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const handleRemoveModal = () => {
    setRemoveModalVisible(true);
    setCheckListId(undefined);
  };

  return (
    <>
      <CenteredSafeArea>
        <ScrollView>
          <BackButton label={"체크리스트"} onPress={() => console.log("뒤로 가기")} />

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

          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Row>
              <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>총예산 </Text>
              <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>200,000</Text>
            </Row>
            <Row>
              <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>- 현재 결제 금액 </Text>
              <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>200,000</Text>
            </Row>
            <Row>
              <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>= 남은 예산 </Text>
              <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>200,000</Text>
            </Row>
          </View>

          <Divider style={{ backgroundColor: Color.BLUE200, height: 8, marginTop: 20 }} />

          {category.checkList.map((checkList, index) => (
            <View style={{ marginLeft: 10, marginRight: 10 }} key={checkList.id}>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox
                    label={checkList.description}
                    isChecked={checkList.isCompleted}
                    onPress={() => console.log("클릭")}
                  />
                </View>

                <Menu
                  visible={checkListId === checkList.id}
                  onDismiss={() => setCheckListId(undefined)}
                  anchor={
                    <Button onPress={() => setCheckListId(checkList.id)} textColor={Color.BLACK}>
                      <Icon source="menu" size={13} />
                    </Button>
                  }
                  contentStyle={{ backgroundColor: Color.WHITE }}
                >
                  <Menu.Item leadingIcon="pencil" onPress={() => console.log("수정")} title="수정" />
                  <Menu.Item leadingIcon="delete" onPress={handleRemoveModal} title="삭제" />
                </Menu>
              </View>

              <View>
                <Text style={{ color: Color.DARK_GRAY, fontSize: 10 }}>
                  {dayjs(checkList.reservedDate).format("YYYY-MM-DD HH:mm")}
                </Text>
                {checkList.status && (
                  <Text style={{ fontSize: 14, marginTop: 10 }}>{convertCheckListStatus(checkList.status)}</Text>
                )}
                {checkList.memo && <Text style={{ fontSize: 14, marginTop: 10 }}>{checkList.memo}</Text>}
              </View>
              {checkList.costs.map((cost, index) => (
                <View key={`cost-${index}`}>
                  <Divider style={{ marginTop: 20 }} />
                  <Text style={{ fontSize: 10, marginTop: 10 }}>{covertCostType(cost.costType)}</Text>
                  <Row>
                    <Text style={{ fontSize: 16, fontWeight: "bold", flex: 0 }}>{cost.title}</Text>
                    <Text style={{ fontSize: 16, textAlign: "right", flex: 1 }}>{cost.amount}</Text>
                  </Row>
                  <Text style={{ fontSize: 10, color: Color.DARK_GRAY }}>
                    {cost.paymentDate ? dayjs(cost.paymentDate).format("YYYY-MM-DD HH:mm") : "결제 전"}
                  </Text>
                  {cost.memo && <Text style={{ marginTop: 10 }}>{cost.memo}</Text>}
                </View>
              ))}
              <Divider style={{ backgroundColor: Color.BLUE100, height: 3, marginTop: 20 }} />
            </View>
          ))}

          <BottomButton
            label="체크리스트 추가하기"
            onPress={() => console.log("추가하기 클릭")}
            disabled={false}
          ></BottomButton>
        </ScrollView>
      </CenteredSafeArea>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </>
  );
};

export default CheckLists;
