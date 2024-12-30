import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ICheckList, ICheckListTemp } from "../../interface/check-list.interface";
import CheckBox from "../CheckBox";
import CustomMenu from "../common/Menu";
import { Color } from "../../enum";
import { Divider } from "react-native-paper";
import { Badge } from "../common/Badge";
import ShadowView from "../common/ShadowView";

interface CheckListItemProps {
  item: ICheckListTemp;
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

      <Text style={styles.dateText}>
        {item.reservedDate} {item.reservedTime}
      </Text>
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
  checkListContainer: {
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
    marginTop: 10,
    fontSize: 12,
  },
});

export default CheckListItem;
