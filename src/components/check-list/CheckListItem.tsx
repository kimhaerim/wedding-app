import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "../common/CheckBox";
import CustomMenu from "../common/Menu";
import { Color } from "../../enum";
import { Divider } from "react-native-paper";
import Badge from "../common/Badge";
import { ICheckList } from "../../interface";
import { convertDateTimeToString } from "../../common/util";

interface CheckListItemProps {
  item: ICheckList;
  checkListId: number | undefined;
  onMenuButtonPress: (id: number | undefined) => void;
  onMenuItemPress: (action: string, id: number) => void;
}

const CheckListItem: React.FC<CheckListItemProps> = ({ item, checkListId, onMenuButtonPress, onMenuItemPress }) => {
  return (
    <View>
      <View style={styles.checkListRow}>
        <CheckBox label={item.description} isChecked={item.isCompleted} onPress={() => console.log("클릭")} />

        <View style={styles.menuContainer}>
          {item.category && (
            <Badge
              label={item.category.title}
              backgroundColor={Color.BLUE200}
              labelStyle={{ color: Color.BLACK }}
            ></Badge>
          )}

          <CustomMenu
            visible={checkListId === item.id}
            onButtonPress={() => onMenuButtonPress(item.id)}
            onDismiss={() => onMenuButtonPress(undefined)}
            onMenuItemPress={(action: string) => onMenuItemPress(action, item.id)}
          />
        </View>
      </View>

      {item.reservedDate && <Text style={styles.dateText}>{convertDateTimeToString(item.reservedDate)}</Text>}
      {item.memo && (
        <>
          <Divider />
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
    marginBottom: 10,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    color: Color.DARK_GRAY,
    marginBottom: 5,
  },
  memoText: {
    marginTop: 10,
    fontSize: 12,
  },
});

export default CheckListItem;
