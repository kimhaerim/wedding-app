import Modal from "react-native-modal";
import { ICheckList, ICost } from "../interface";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import ShadowView from "../components/common/ShadowView";
import CheckBox from "../components/common/CheckBox";
import Badge from "../components/common/Badge";
import CustomMenu from "../components/common/Menu";
import { Text } from "react-native-paper";
import { convertDateTimeToString, convertDateToString, covertCostType, formatCurrency } from "../common/util";
import { CalendarType, Color } from "../enum";
import Button from "../components/common/Button";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CalendarStackParamList } from "../navigation/types";
import CheckListItem from "../components/check-list/CheckListItem";
import Row from "../components/common/Row";
import BottomModal from "./BottomModal";
import Title from "../components/common/Title";

interface DayDetailModalProps {
  isVisible: boolean;
  checkList: ICheckList[];
  costs: ICost[];
  selectedDate: string;
  onHide: () => void;
}

type CheckListNavigationProp = StackNavigationProp<CalendarStackParamList, "CheckListDetail" | "EditCheckList">;

const DayDetailModal: React.FC<DayDetailModalProps> = ({ isVisible, checkList, costs, selectedDate, onHide }) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    checkList.length === 0 && costs.length === 0
      ? CalendarType.CHECK_LIST
      : checkList.length > 0
      ? CalendarType.CHECK_LIST
      : CalendarType.COST
  );

  const navigation = useNavigation<CheckListNavigationProp>();

  const handleCheckListPress = (id: number) => {
    onHide();
    navigation.navigate("CheckListDetail", { id });
  };

  const handleAddCheckListPress = () => {
    onHide();
    navigation.navigate("EditCheckList", { isFromCategory: false });
  };

  const handleAddCostPress = () => {
    onHide();
    navigation.navigate("EditCost", {});
  };

  const formattedDate = useMemo(() => convertDateToString(new Date(selectedDate)), [selectedDate]);

  const renderItem = (item: ICheckList) => {
    return (
      <ShadowView>
        <TouchableOpacity onPress={() => handleCheckListPress(item.id)} key={`checkList-${item.id}`}>
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
            </View>
          </View>

          {item.reservedDate && <Text style={styles.dateText}>{convertDateTimeToString(item.reservedDate)}</Text>}
        </TouchableOpacity>
      </ShadowView>
    );
  };

  const modalHeight = useMemo(() => {
    if (calendarType === CalendarType.CHECK_LIST && checkList.length === 0) return 30;
    if (calendarType === CalendarType.COST && costs.length === 0) return 30;
    return 60;
  }, [calendarType, checkList, costs]);

  return (
    <BottomModal visible={isVisible} hideModal={onHide} height={modalHeight}>
      <Title
        label={`${formattedDate} ${calendarType === CalendarType.CHECK_LIST ? "체크리스트" : "지출 내역"}`}
      ></Title>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button style={[styles.button]} onPress={() => setCalendarType(CalendarType.CHECK_LIST)}>
          <Text style={[styles.label]}>일정</Text>
        </Button>

        <Button style={[styles.button]} onPress={() => setCalendarType(CalendarType.COST)}>
          <Text style={[styles.label]}>지출</Text>
        </Button>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
        <View
          style={[
            styles.borderBottom,
            { borderBottomColor: calendarType === CalendarType.CHECK_LIST ? Color.BLUE200 : Color.GRAY },
          ]}
        />

        <View
          style={[
            styles.borderBottom,
            { borderBottomColor: calendarType === CalendarType.COST ? Color.BLUE200 : Color.GRAY },
          ]}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        {calendarType === CalendarType.CHECK_LIST && (
          <>
            {checkList.length > 0 ? (
              <View>
                <FlatList
                  data={checkList}
                  keyExtractor={(item) => `checkList-${item.id}`}
                  renderItem={({ item }) => renderItem(item)}
                />
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                  <Button onPress={onHide} style={{ backgroundColor: Color.GRAY, width: "50%" }}>
                    <Text>닫기</Text>
                  </Button>
                </View>
              </View>
            ) : (
              <Button style={{ marginTop: 30 }} onPress={handleAddCheckListPress}>
                <Text>새로운 체크리스트 추가하기</Text>
              </Button>
            )}
          </>
        )}

        {calendarType === CalendarType.COST && (
          <>
            {costs.length > 0 ? (
              <View>
                <FlatList
                  data={costs}
                  keyExtractor={(item) => `cost-${item.id}`}
                  renderItem={({ item }) => (
                    <ShadowView>
                      <TouchableOpacity onPress={() => handleCheckListPress(item.id)} key={`cost-${item.id}`}>
                        <Row>
                          <Text style={{ fontSize: 10 }}>{covertCostType(item.costType)}</Text>
                          <Text
                            style={{ fontSize: 10, marginLeft: 10, color: item.paymentDate ? Color.BLUE : Color.RED }}
                          >
                            {item.paymentDate ? "결제 완료" : "결제 전"}
                          </Text>
                        </Row>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <Text>{item.title}</Text>
                          <Text style={{ textAlign: "right" }}>{formatCurrency(item.amount)}</Text>
                        </View>
                      </TouchableOpacity>
                    </ShadowView>
                  )}
                />
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                  <Button onPress={onHide} style={{ backgroundColor: Color.GRAY, width: "50%" }}>
                    <Text>닫기</Text>
                  </Button>
                </View>
              </View>
            ) : (
              <Button style={{ marginTop: 30 }} onPress={handleAddCostPress}>
                <Text>새로운 지출 내역 추가하기</Text>
              </Button>
            )}
          </>
        )}
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  button: {
    marginHorizontal: 5,
    width: "50%",
    backgroundColor: Color.WHITE,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  dateText: {
    color: Color.DARK_GRAY,
    fontSize: 11,
    marginBottom: 5,
  },
  borderBottom: {
    width: "50%",
    borderBottomWidth: 2,
  },
});

export default DayDetailModal;
