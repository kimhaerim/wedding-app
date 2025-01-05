import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ICost } from "../../interface/check-list.interface";

import CustomMenu from "../common/Menu";
import { Color, CostType } from "../../enum";
import { Divider } from "react-native-paper";
import { convertDateToString, covertCostType, formatCurrency } from "../../common/util";
import Badge from "../common/Badge";

interface CostItemProps {
  item: ICost;
  costId: number | undefined;
  onCostPress: () => void;
  onMenuButtonPress: (id: number | undefined) => void;
  onMenuItemPress: (action: string, id: number) => void;
}

const CostItem: React.FC<CostItemProps> = ({ item, costId, onCostPress, onMenuItemPress }) => {
  return (
    <TouchableOpacity style={{ marginTop: 10 }} onPress={onCostPress}>
      <Badge
        backgroundColor={item.costType === CostType.BASE ? Color.BLUE : Color.DARK_GRAY}
        label={covertCostType(item.costType)}
        labelStyle={{ color: Color.WHITE, fontSize: 12, textAlign: "center" }}
      ></Badge>

      <View style={styles.costListRow}>
        {item.title && <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>}
        {/* <View style={styles.menuContainer}> */}
        <Text>{formatCurrency(item.amount)}</Text>
        {/* <CustomMenu
            visible={costId === item.id}
            onButtonPress={() => onMenuButtonPress(item.id)}
            onDismiss={() => onMenuButtonPress(undefined)}
            onMenuItemPress={(action: string) => onMenuItemPress(action, item.id)}
          /> */}
        {/* </View> */}
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
