import * as React from "react";
import { Dialog, Divider, Modal, Portal, Text } from "react-native-paper";
import { Color } from "../enum";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../components/common/Button";
import BudgetSummaryRow from "../components/cost/BudgetSummaryRow";
import { ICategory, ICheckList, ICostByCheckList } from "../interface";

interface BudgetDetailModalProps {
  visible: boolean;
  checkList: ICheckList;
  category: ICategory;
  combinedCost: ICostByCheckList;
  hideModal: () => void;
}

const BudgetDetailModal: React.FC<BudgetDetailModalProps> = ({
  checkList,
  category,
  combinedCost,
  visible,
  hideModal,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal} style={{ backgroundColor: Color.WHITE }}>
        <Dialog.Title style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
          {`<${category.title}> 내역`}
        </Dialog.Title>
        <Dialog.Content>
          <BudgetSummaryRow iconSource="cash" label="총 예산" value={category.budgetAmount}></BudgetSummaryRow>

          <BudgetSummaryRow iconSource="currency-usd" label="총 비용" value={combinedCost.totalCost}></BudgetSummaryRow>

          <Divider style={{ margin: 5 }} />

          <BudgetSummaryRow
            iconSource="check-circle"
            label="결제 금액"
            value={combinedCost.paidCost}
          ></BudgetSummaryRow>
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
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "center" }}>
          <Button
            style={[
              styles.button,
              {
                marginRight: 10,
                borderColor: Color.GRAY,
                backgroundColor: Color.GRAY,
              },
            ]}
            onPress={hideModal}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>닫기</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: Color.WHITE,
    padding: 20,
    width: 350,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionStyle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: 100,
    borderWidth: 1,
  },
});

export default BudgetDetailModal;
