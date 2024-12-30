import React from "react";
import Row from "../common/Row";
import { Icon, Text } from "react-native-paper";
import { formatCurrency } from "../../common/util";
import { Color } from "../../enum";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

interface BudgetSummaryRowProps {
  iconSource: string;
  label: string;
  value: number;
  valueStyle?: StyleProp<TextStyle>;
}

const BudgetSummaryRow: React.FC<BudgetSummaryRowProps> = (props) => {
  const { iconSource, label, value, valueStyle } = props;
  return (
    <Row style={{ marginBottom: 5 }}>
      <Icon color={Color.DARK_GRAY} source={iconSource} size={15} />
      <Text style={[styles.labelStyle]}>{label}</Text>
      <Text style={[styles.valueStyle, valueStyle]}>{formatCurrency(value)}</Text>
    </Row>
  );
};

const styles = StyleSheet.create({
  labelStyle: { marginLeft: 5, fontSize: 13, flex: 0, fontWeight: "bold" },
  valueStyle: { fontSize: 13, flex: 1, textAlign: "right", marginRight: 15 },
});

export default BudgetSummaryRow;
