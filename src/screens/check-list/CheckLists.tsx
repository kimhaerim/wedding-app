import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomText from "../../components/Text";
import { ICategory } from "../../interface/category.interface";
import { CheckListStatus, Color, CostType } from "../../enum";
import CheckBox from "../../components/CheckBox";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import dayjs from "dayjs";
import CustomRow from "../../components/Row";
import HorizontalLine from "../../components/HorizontalLine";
import styled from "styled-components/native";
import { ICheckList, ICost } from "../../interface/check-list.interface";

const convertCheckListStatus = (status: CheckListStatus) => {
  switch (status) {
    case CheckListStatus.PENDING:
      return "보류";
    case CheckListStatus.CONFIRMED:
      return "확정";
    case CheckListStatus.REJECTED:
      return "탈락";
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
  const [category, setCategory] = useState<ICategory>({
    id: 1,
    title: "본식DVD",
    budgetAmount: 0,
    checkList: [
      {
        id: 1,
        description: "사진보라",
        isCompleted: false,
        memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
        reservedDate: new Date(),
        status: CheckListStatus.CONFIRMED,
        costs: [
          {
            title: "계약금 결제",
            amount: 100000,
            costType: CostType.BASE,
            memo: "어쩌구 저쩌구 몰래몰래",
            paymentDate: new Date(),
          },
          { title: "2부 연회장 결제", amount: 100000, costType: CostType.ADDITIONAL },
        ],
      },
      {
        id: 2,
        description: "사진보라",
        isCompleted: false,
        memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
        reservedDate: new Date(),
        status: CheckListStatus.CONFIRMED,
        costs: [
          {
            title: "계약금 결제",
            amount: 100000,
            costType: CostType.BASE,
            memo: "어쩌구 저쩌구 몰래몰래",
            paymentDate: new Date(),
          },
          { title: "2부 연회장 결제", amount: 100000, costType: CostType.ADDITIONAL },
        ],
      },
    ],
  });

  return (
    <CenteredSafeArea>
      <ScrollView>
        <BackButton title={"체크리스트"} onPress={() => console.log("뒤로 가기")} />
        <HeaderSection title={category.title} />
        <BudgetInfo />
        <HorizontalLine backgroundColor={Color.BLUE100} height={8} />

        {category.checkList.map((checkList, index) => (
          <CheckListItem key={checkList.id} checkList={checkList} isLast={index === category.checkList.length - 1} />
        ))}
      </ScrollView>
    </CenteredSafeArea>
  );
};

export default CheckLists;

const HeaderSection = ({ title }: { title: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20, marginTop: 10 }}>
    <CircleContainer>
      <CustomText title={"📸"} fontSize={18} bold />
    </CircleContainer>
    <View style={{ marginLeft: 10 }}>
      <CustomText title={title} fontSize={20} bold />
    </View>
  </View>
);

const BudgetInfo = () => (
  <View style={{ marginLeft: 20, marginTop: 10 }}>
    <BudgetRow title="총 예산" amount="200,000" />
    <BudgetRow title="- 현재 결제 금액" amount="200,000" />
    <BudgetRow title="= 남은 예산" amount="200,000" />
  </View>
);

const BudgetRow = ({ title, amount }: { title: string; amount: string }) => (
  <CustomRow>
    <CustomText title={title} fontSize={12} bold />
    <CustomText title={amount} fontSize={12} textAlign="right" margin="0px 15px 0px 0px" />
  </CustomRow>
);

const CheckListItem = ({ checkList, isLast }: { checkList: ICheckList; isLast: boolean }) => (
  <CheckListContainer>
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <CheckBox
        isChecked={checkList.isCompleted}
        label={checkList.description}
        onValueChange={() => console.log("agree", checkList.id)}
      />
      <TouchableOpacity onPress={() => console.log("수정", checkList.id)} style={{ flexDirection: "row" }}>
        <Icon name="create" size={20} color={Color.BLUE} />
        <CustomText title="수정" fontSize={14} margin="0 0 0 5px" />
      </TouchableOpacity>
    </View>
    <DetailsSection checkList={checkList} />

    {checkList.costs.map((cost: any, index: number) => (
      <CostItem key={index} cost={cost} />
    ))}

    {!isLast && <HorizontalLine backgroundColor={Color.BLUE100} height={8} />}
  </CheckListContainer>
);

const DetailsSection = ({ checkList }: { checkList: ICheckList }) => (
  <View style={{ marginLeft: 50 }}>
    {checkList.reservedDate && (
      <CustomText title={`${dayjs(checkList.reservedDate).format("YYYY-MM-DD HH:mm")}`} fontSize={10} />
    )}
    {checkList.status && (
      <CustomText title={convertCheckListStatus(checkList.status)} fontSize={14} margin="10px 0 0 0" />
    )}
    {checkList.memo && <CustomText title={checkList.memo} fontSize={14} margin="10px 0 0 0" />}
  </View>
);

const CostItem = ({ cost }: { cost: ICost }) => (
  <CostItemContainer>
    <HorizontalLine height={1} />
    <CustomText title={covertCostType(cost.costType)} fontSize={10} margin="10px 0 0 0" />
    <CustomRow>
      <CustomText title={cost.title} fontSize={16} bold />
      <CustomText title={`${cost.amount}`} fontSize={16} textAlign="right" />
    </CustomRow>
    {cost.paymentDate && <CustomText title={dayjs(cost.paymentDate).format("YYYY-MM-DD HH:mm")} fontSize={10} />}
    {cost.memo && <CustomText title={cost.memo} fontSize={14} margin="10px 0 0 0" />}
  </CostItemContainer>
);

export const CircleContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f8ff;
  justify-content: center;
  align-items: center;
`;

export const CostItemContainer = styled.View`
  margin: 10px 10px 0 10px;
`;

export const CheckListContainer = styled.View`
  margin: 0 10px 20px 10px;
`;
