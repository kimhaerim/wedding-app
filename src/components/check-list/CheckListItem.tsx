import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { convertDateTimeToString } from "../../common/util";
import { Color } from "../../enum";
import { ICheckList } from "../../interface";
import Badge from "../common/Badge";
import CheckBox from "../common/CheckBox";
import CustomMenu from "../common/Menu";

interface CheckListItemProps {
  item: ICheckList;
  checkListId?: number;
  onMenuButtonPress: (id?: number) => void;
  onMenuItemPress: (action: string, id: number) => void;
}

const CheckListItem: React.FC<CheckListItemProps> = (props) => {
  const { item, checkListId, onMenuButtonPress, onMenuItemPress } = props;
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
