import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ICheckListTemp } from "../../interface/check-list.interface";
import CheckBox from "../CheckBox";
import CustomMenu from "../common/Menu";
import { Color } from "../../enum";

interface CheckListItemProps {
  item: ICheckListTemp;
  checkListId: number | undefined;
  onMenuButtonPress: (id: number | undefined) => void;
  onMenuItemPress: (action: string, id: number) => void;
}

const CheckListItem = ({ item, checkListId, onMenuButtonPress, onMenuItemPress }: CheckListItemProps) => {
  return (
    <View style={styles.checkListContainer}>
      <View style={styles.checkListRow}>
        <CheckBox label={item.description} isChecked={item.isCompleted} onPress={() => console.log("클릭")} />

        <View style={styles.menuContainer}>
          {item.category && <Text style={styles.categoryText}>{item.category?.title}</Text>}

          <CustomMenu
            visible={checkListId === item.id}
            onButtonPress={() => onMenuButtonPress(item.id)}
            onDismiss={() => onMenuButtonPress(undefined)}
            onMenuItemPress={(action: string) => onMenuItemPress(action, item.id)}
          />
        </View>
      </View>

      <Text style={styles.dateText}>
        {item.reservedDate} {item.reservedTime}
      </Text>

      <Text style={styles.memoText}>{item.memo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkListContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: Color.WHITE,
  },
  checkListRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
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

export default CheckListItem;
