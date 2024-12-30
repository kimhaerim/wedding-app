import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ICheckListTemp, ICost } from "../../interface/check-list.interface";
import CheckBox from "../CheckBox";
import CustomMenu from "../common/Menu";
import { Color } from "../../enum";
import { Divider } from "react-native-paper";
import { Badge } from "../common/Badge";
import { convertDateTimeToString, convertDateToString, covertCostType, formatCurrency } from "../../common/util";
import ShadowView from "../common/ShadowView";

interface CostItemProps {
  item: ICost;
  costId: number | undefined;
  onMenuButtonPress: (id: number | undefined) => void;
  onMenuItemPress: (action: string, id: number) => void;
}

const CostItem: React.FC<CostItemProps> = ({ item, costId, onMenuButtonPress, onMenuItemPress }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Badge
        backgroundColor={item.paymentDate ? Color.BLUE : Color.DARK_GRAY}
        label={covertCostType(item.costType)}
        labelStyle={{ color: Color.WHITE, fontSize: 12, textAlign: "center" }}
      ></Badge>

      <View style={styles.checkListRow}>
        {item.title && <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>}
        <View style={styles.menuContainer}>
          <Text>{formatCurrency(item.amount)}</Text>
          <CustomMenu
            visible={costId === item.id}
            onButtonPress={() => onMenuButtonPress(item.id)}
            onDismiss={() => onMenuButtonPress(undefined)}
            onMenuItemPress={(action: string) => onMenuItemPress(action, item.id)}
          />
        </View>
      </View>

      <Text style={styles.dateText}> {item.paymentDate ? convertDateToString(item.paymentDate) : "지불 예정"}</Text>
      {item.memo && (
        <>
          <Divider style={{ marginBottom: 10 }} />
          <Text style={styles.memoText}>{item.memo}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkListRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    color: Color.BLUE,
  },
  dateText: {
    fontSize: 12,
    color: Color.DARK_GRAY,
    marginBottom: 5,
  },
  memoText: {
    fontSize: 12,
  },
});

export default CostItem;
