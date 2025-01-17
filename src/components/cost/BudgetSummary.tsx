import React from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { Color } from "../../enum";
import BudgetSummaryRow from "./BudgetSummaryRow";

interface BudgetSummaryProps {
  category: { budgetAmount: number; remainingBudget: number };
  combinedCost: { totalCost: number; paidCost: number; unpaidCost: number };
}

const BudgetSummary: React.FC<BudgetSummaryProps> = (props) => {
  const { category, combinedCost } = props;

  const remainingBudgetColor = category.remainingBudget < 0 ? Color.RED : Color.BLACK;

  return (
    <View style={styles.container}>
      <BudgetSummaryRow iconSource="cash" label="총 예산" value={category.budgetAmount} />
      <BudgetSummaryRow iconSource="currency-usd" label="총 비용" value={combinedCost.totalCost} />

      <Divider style={styles.divider} />

      <BudgetSummaryRow iconSource="check-circle" label="결제 금액" value={combinedCost.paidCost} />
      <BudgetSummaryRow iconSource="clock-outline" label="결제 예정 금액" value={combinedCost.unpaidCost} />

      <Divider style={styles.divider} />

      <BudgetSummaryRow
        iconSource="wallet-outline"
        label="남은 예산"
        value={category.remainingBudget}
        valueStyle={{
          color: remainingBudgetColor,
          fontWeight: "bold",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.BLUE100,
  },
  divider: {
    margin: 5,
  },
});

export default BudgetSummary;
