import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ICheckListTemp, ICost } from "../../interface/check-list.interface";
import CheckBox from "../CheckBox";
import CustomMenu from "../common/Menu";
import { Color } from "../../enum";
import { Divider } from "react-native-paper";
import { Badge } from "../common/Badge";
import { convertDateTimeToString, convertDateToString, formatCurrency } from "../../common/util";

interface CostItemProps {
  item: ICost;
  costId: number | undefined;
  onMenuButtonPress: (id: number | undefined) => void;
  onMenuItemPress: (action: string, id: number) => void;
}

const CostItem: React.FC<CostItemProps> = ({ item, costId, onMenuButtonPress, onMenuItemPress }) => {
  return (
    <View style={styles.shadowView}>
      <Badge
        backgroundColor={item.paymentDate ? Color.BLUE : Color.DARK_GRAY}
        label={item.paymentDate ? "결제 완료" : "결제 전"}
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

      {(item.paymentDate || item.memo) && <Divider style={{ marginBottom: 10 }} />}
      {item.paymentDate && <Text style={styles.dateText}> {convertDateToString(item.paymentDate)}</Text>}

      {item.memo && <Text style={styles.memoText}>{item.memo}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  shadowView: {
    padding: 10,
    margin: 5,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    shadowColor: Color.DARK_GRAY,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
    color: Color.DARK_GRAY,
    marginBottom: 5,
  },
  memoText: {
    fontSize: 12,
  },
});

export default CostItem;
