import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ICost } from "../../interface/check-list.interface";

import { Button, Divider, Icon, Menu } from "react-native-paper";
import { convertCostType, convertDateToString, formatCurrency } from "../../common/util";
import { Color, CostType } from "../../enum";
import Badge from "../common/Badge";

interface CostItemProps {
  item: ICost;
  costId?: number;
  onMenuButtonPress: (id: number | undefined) => void;
  onEditButtonPress: (id: number) => void;
  onDeleteButtonPress: () => void;
}

const CostItem: React.FC<CostItemProps> = (props) => {
  const { item, costId, onMenuButtonPress, onEditButtonPress, onDeleteButtonPress } = props;
  return (
    <View style={{ marginTop: 10 }}>
      <Badge
        backgroundColor={item.costType === CostType.BASE ? Color.BLUE : Color.DARK_GRAY}
        label={convertCostType(item.costType)}
        labelStyle={{ color: Color.WHITE, fontSize: 12, textAlign: "center" }}
      ></Badge>

      <View style={styles.costListRow}>
        {item.title && <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>}
        <View style={styles.menuContainer}>
          <Text>{formatCurrency(item.amount)}</Text>

          <Menu
            visible={costId === item.id}
            onDismiss={() => onMenuButtonPress(undefined)}
            anchor={
              <Button onPress={() => onMenuButtonPress(item.id)} textColor={Color.BLACK}>
                <Icon source="menu" size={13} />
              </Button>
            }
            contentStyle={{ backgroundColor: Color.WHITE }}
          >
            <Menu.Item leadingIcon="pencil" onPress={() => onEditButtonPress(item.id)} title="수정" />
            <Menu.Item leadingIcon="delete" onPress={onDeleteButtonPress} title="삭제" />
          </Menu>
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
