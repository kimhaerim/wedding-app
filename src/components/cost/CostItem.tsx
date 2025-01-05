import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICost } from "../../interface/check-list.interface";

import { Divider } from "react-native-paper";
import { convertDateToString, covertCostType, formatCurrency } from "../../common/util";
import { Color, CostType } from "../../enum";
import Badge from "../common/Badge";

interface CostItemProps {
  item: ICost;
  onCostPress: () => void;
}

const CostItem: React.FC<CostItemProps> = (props) => {
  const { item, onCostPress } = props;
  return (
    <TouchableOpacity style={{ marginTop: 10 }} onPress={onCostPress}>
      <Badge
        backgroundColor={item.costType === CostType.BASE ? Color.BLUE : Color.DARK_GRAY}
        label={covertCostType(item.costType)}
        labelStyle={{ color: Color.WHITE, fontSize: 12, textAlign: "center" }}
      ></Badge>

      <View style={styles.costListRow}>
        {item.title && <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>}
        <Text>{formatCurrency(item.amount)}</Text>
      </View>

      <Text style={styles.dateText}> {item.paymentDate ? convertDateToString(item.paymentDate) : "지불 예정"}</Text>
      {item.memo && (
        <>
          <Divider style={{ marginBottom: 10 }} />
          <Text style={styles.memoText}>{item.memo}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  costListRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: Color.DARK_GRAY,
    marginVertical: 5,
  },
  memoText: {
    fontSize: 12,
  },
});

export default CostItem;
