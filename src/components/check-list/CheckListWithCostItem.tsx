import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { convertCostType, convertDateTimeToString, convertDateToString, formatCurrency } from "../../common/util";
import { Color, CostType } from "../../enum";
import { ICheckList } from "../../interface/check-list.interface";
import Badge from "../common/Badge";
import CheckBox from "../common/CheckBox";
import CustomMenu from "../common/Menu";
import ShadowView from "../common/ShadowView";

interface CheckListWithCostItemProps {
  checkList: ICheckList;
  checkListId: number | undefined;
  onCheckListPress: () => void;
  onMenuItemPress: (action: string, id: number) => void;
  onMenuButtonPress: (id?: number) => void;
}

const CheckListWithCostItem: React.FC<CheckListWithCostItemProps> = (props) => {
  const { checkList, checkListId, onCheckListPress, onMenuItemPress, onMenuButtonPress } = props;

  return (
    <ShadowView>
      <View>
        <View style={styles.checkListRow}>
          <CheckBox label={checkList.description} isChecked={checkList.isCompleted} onPress={onCheckListPress} />

          <View style={styles.menuContainer}>
            <CustomMenu
              visible={checkListId === checkList.id}
              onButtonPress={() => onMenuButtonPress(checkList.id)}
              onDismiss={() => onMenuButtonPress(undefined)}
              onMenuItemPress={(action: string) => onMenuItemPress(action, checkList.id)}
            />
          </View>
        </View>

        {checkList.reservedDate && (
          <Text style={styles.dateText}>{convertDateTimeToString(checkList.reservedDate)}</Text>
        )}
        {checkList.memo && <Text style={styles.memoText}>{checkList.memo}</Text>}

        {checkList.costs.length > 0 && (
          <FlatList
            horizontal
            data={checkList.costs}
            keyExtractor={(item) => `cost-${item.id}`}
            contentContainerStyle={{ flexDirection: "row" }}
            style={{ marginVertical: 10, width: "100%" }}
            renderItem={({ item }) => (
              <View style={styles.costItemContainer}>
                <Badge
                  backgroundColor={item.costType === CostType.BASE ? Color.BLUE : Color.DARK_GRAY}
                  label={convertCostType(item.costType)}
                  labelStyle={{ color: Color.WHITE, fontSize: 12, textAlign: "center" }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>{item.title || "제목 없음"}</Text>
                <Text style={styles.dateText}>
                  {item.paymentDate ? convertDateToString(item.paymentDate) : "지불 예정"}
                </Text>
                <Text style={{ marginTop: 5 }}>{formatCurrency(item.amount)}</Text>
                {item.memo && <Text style={styles.memoText}>{item.memo}</Text>}
              </View>
            )}
          />
        )}
      </View>
    </ShadowView>
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
    marginBottom: 10,
    fontSize: 12,
  },
  costItemContainer: {
    width: 250,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Color.BLUE100,
    borderRadius: 10,
    backgroundColor: Color.WHITE,
    shadowColor: Color.DARK_GRAY,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CheckListWithCostItem;
