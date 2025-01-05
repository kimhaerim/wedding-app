import * as React from "react";
import { StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";
import Button from "../components/common/Button";
import Title from "../components/common/Title";
import BudgetSummaryRow from "../components/cost/BudgetSummaryRow";
import { Color } from "../enum";
import { ICategory, ICheckList, ICostByCheckList } from "../interface";
import BottomModal from "./BottomModal";

interface BudgetDetailModalProps {
  visible: boolean;
  checkList: ICheckList;
  category: ICategory;
  combinedCost: ICostByCheckList;
  hideModal: () => void;
}

const BudgetDetailModal: React.FC<BudgetDetailModalProps> = (props) => {
  const { checkList, category, combinedCost, visible, hideModal } = props;
  return (
    <BottomModal visible={visible} hideModal={hideModal} height={30}>
      <Title label={`<${category.title}> 내역`}></Title>

      <BudgetSummaryRow iconSource="cash" label="총 예산" value={category.budgetAmount}></BudgetSummaryRow>

      <BudgetSummaryRow iconSource="currency-usd" label="총 비용" value={combinedCost.totalCost}></BudgetSummaryRow>

      <Divider style={{ margin: 5 }} />

      <BudgetSummaryRow iconSource="check-circle" label="결제 금액" value={combinedCost.paidCost}></BudgetSummaryRow>
      <BudgetSummaryRow
        iconSource="clock-outline"
        label="결제 예정 금액"
        value={combinedCost.unpaidCost}
      ></BudgetSummaryRow>

      {checkList.category && (
        <>
          <Divider style={{ margin: 5 }} />
          <BudgetSummaryRow
            iconSource="wallet-outline"
            label="남은 예산"
            value={checkList.category.budgetAmount - combinedCost.totalCost}
            valueStyle={{
              color: checkList.category.budgetAmount - combinedCost.totalCost < 0 ? Color.RED : Color.BLACK,
              fontWeight: "bold",
            }}
          ></BudgetSummaryRow>
        </>
      )}

      <Button style={[styles.button]} onPress={hideModal}>
        <Text style={[styles.buttonLabel]}>닫기</Text>
      </Button>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginHorizontal: 5,
    borderColor: Color.GRAY,
    backgroundColor: Color.GRAY,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BudgetDetailModal;
