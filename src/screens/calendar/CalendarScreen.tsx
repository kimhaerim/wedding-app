import React, { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import { CheckListStatus, Color, CostType } from "../../enum";
import { ICheckListTemp, ICost } from "../../interface/check-list.interface";
import Row from "../../components/common/Row";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import CheckBox from "../../components/common/CheckBox";
import ConfirmModal from "../../modal/ConfirmModal";
import CommonCalendar from "../../components/calendar/Calendar";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { CalendarType } from "../../enum/calendar.enum";
import CustomMenu from "../../components/common/Menu";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import ShadowView from "../../components/common/ShadowView";
import CheckListItem from "../../components/check-list/CheckListItem";
import Badge from "../../components/common/Badge";
import CostItem from "../../components/cost/CostItem";

interface MarkedDate {
  selected: boolean;
  dots: { key: string; color: Color }[];
  marked: boolean;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(amount);
};

const covertCostType = (costType: CostType) => {
  switch (costType) {
    case CostType.BASE:
      return "기본금";
    case CostType.ADDITIONAL:
      return "✚ 추가금";
  }
};

const CalendarScreen = () => {
  const today = new Date();
  const [selected, setSelected] = useState(today.toISOString().split("T")[0]);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1);
  const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.CHECK_LIST);
  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [costId, setCostId] = useState<number | undefined>(undefined);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const [checkListAgendaList, setCheckListAgendaList] = useState<ICheckListTemp[]>([]);
  const [costAgendaLists, setCostAgendaLists] = useState<ICost[]>([]);

  const [isSummaryVisible, setIsSummaryVisible] = useState(true); // New state for controlling the summary visibility

  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    [selected]: { selected: true, disableTouchEvent: true },
  });

  const checkLists: ICheckListTemp[] = [
    {
      id: 1,
      description: "사진보라",
      isCompleted: true,
      memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
      reservedDate: "2024-12-01",
      reservedTime: "12:00",
      status: CheckListStatus.CONFIRMED,
    },
    {
      id: 2,
      description: "사진보라",
      isCompleted: false,
      memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
      reservedDate: "2024-12-10",
      reservedTime: "12:00",
      status: CheckListStatus.REJECTED,
    },
    {
      id: 3,
      description: "사진보라",
      isCompleted: true,
      memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
      reservedDate: "2024-12-10",
      reservedTime: "12:00",
      status: CheckListStatus.REJECTED,
    },
  ];

  const costs: ICost[] = [
    {
      id: 1,
      title: "예약금",
      amount: 100000,
      paymentDate: new Date(),
      costType: CostType.BASE,
    },
    {
      id: 2,
      title: "예약금1",
      amount: 100000,
      paymentDate: new Date("2024-12-10"),
      costType: CostType.BASE,
    },
    {
      id: 3,
      title: "예약금",
      amount: 100000,
      paymentDate: new Date("2024-12-11"),
      costType: CostType.BASE,
    },
  ];

  const checkListsMarkedData = checkLists.reduce((acc: { [key: string]: MarkedDate }, cur) => {
    if (!cur.reservedDate) {
      return acc;
    }

    const isSelected = selected === cur.reservedDate;
    const dot = {
      key: cur.isCompleted ? "completed" : "notCompleted",
      color: cur.isCompleted ? Color.BLUE : Color.RED,
    };
    if (!acc[cur.reservedDate]) {
      acc[cur.reservedDate] = {
        selected: isSelected,
        marked: true,
        dots: [dot],
      };

      return acc;
    }

    acc[cur.reservedDate].dots.push(dot);
    return acc;
  }, {});

  const costsMarkedData = costs.reduce((acc: { [key: string]: MarkedDate }, cur) => {
    if (!cur.paymentDate) {
      return acc;
    }

    const paymentDateString = cur.paymentDate.toISOString().split("T")[0];
    const isSelected = selected === paymentDateString;
    const dot = {
      key: "completed",
      color: Color.BLUE,
    };
    if (!acc[paymentDateString]) {
      acc[paymentDateString] = {
        selected: isSelected,
        marked: true,
        dots: [dot],
      };

      return acc;
    }

    acc[paymentDateString].dots.push(dot);
    return acc;
  }, {});

  const checkListCount = { allCount: 20, completedCount: 15, incompleteCount: 5 };

  const summaryData = (): { total: string; items: { label: string; value: string }[] } => {
    if (calendarType === CalendarType.CHECK_LIST) {
      return {
        total: `${checkListCount.allCount}개`,
        items: [
          { label: "완료", value: `${checkListCount.completedCount}개` },
          { label: "미완료", value: `${checkListCount.incompleteCount}개` },
        ],
      };
    }

    return {
      total: `200,000원`,
      items: [
        { label: "결제", value: `100,000원` },
        { label: "미결제", value: `100,000원` },
      ],
    };
  };

  const onMonthChange = useCallback(
    (date: DateData) => {
      setCurrentYear(date.year);
      setCurrentMonth(date.month);
      console.log(currentMonth);
    },
    [currentMonth]
  );

  const handleMenuItemPress = (type: string, action: string, id: number) => {
    switch (action) {
      case "view":
        console.log("상세 보기", id);
        break;
      case "edit":
        console.log("수정", id);
        break;
      case "delete":
        console.log("삭제", id);
        setRemoveModalVisible(true);
        type === "cost" ? setCostId(undefined) : setCheckListId(undefined);
        break;
      default:
        break;
    }
  };

  const handleSummaryToggle = () => {
    setIsSummaryVisible((prev) => !prev); // Toggle summary visibility
  };

  useEffect(() => {
    console.log("useEffect", currentYear);
    console.log("useEffect", currentMonth);
  }, [currentMonth]);

  useEffect(() => {
    if (calendarType === CalendarType.CHECK_LIST) {
      const checkListSections: ICheckListTemp[] = checkLists.filter((checkList) => checkList.reservedDate === selected);
      setCheckListAgendaList(checkListSections);
      return;
    }

    const costSections: ICost[] = costs.filter((cost) => {
      const paymentDateString = cost.paymentDate?.toISOString().split("T")[0];
      return paymentDateString === selected;
    });
    setCostAgendaLists(costSections);
    console.log(costSections);
  }, [selected, calendarType]);

  useEffect(() => {
    const selectedCalendarType = calendarType === CalendarType.CHECK_LIST ? checkListsMarkedData : costsMarkedData;
    const markedDates = { [selected]: { selected: true, disableTouchEvent: true }, ...selectedCalendarType };
    setMarkedDates(markedDates);
    console.log("markedDates", markedDates);
  }, [calendarType, selected]);

  return (
    <WhiteSafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginHorizontal: 20 }}>
        <View>
          <CalendarHeader
            calendarType={calendarType}
            setCalendarType={setCalendarType}
            currentMonth={currentMonth}
            summaryData={summaryData()}
          />
        </View>

        <CommonCalendar
          markedDates={markedDates}
          onMonthChange={onMonthChange}
          onDayPress={(date: DateData) => setSelected(date.dateString)}
        ></CommonCalendar>

        {calendarType === CalendarType.CHECK_LIST && (
          <FlatList
            data={checkListAgendaList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <ShadowView>
                <View>
                  <View style={styles.checkListRow}>
                    <CheckBox
                      label={item.description}
                      isChecked={item.isCompleted}
                      onPress={() => console.log("클릭")}
                    />

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
                        onButtonPress={() => setCheckListId(item.id)}
                        onDismiss={() => setCheckListId(undefined)}
                        onMenuItemPress={(action: string) =>
                          handleMenuItemPress(CalendarType.CHECK_LIST, action, item.id)
                        }
                      />
                    </View>
                  </View>

                  <Text style={styles.dateText}>
                    {item.reservedDate} {item.reservedTime}
                  </Text>
                </View>
              </ShadowView>
            )}
          />
        )}

        {calendarType === CalendarType.COST && (
          <FlatList
            data={costAgendaLists}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <ShadowView>
                <View key={`cost-${item.id}`}>
                  <Row>
                    <Text style={{ fontSize: 10 }}>{covertCostType(item.costType)}</Text>
                    <Text style={{ fontSize: 10, marginLeft: 10, color: item.paymentDate ? Color.BLUE : Color.RED }}>
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
                    <CustomMenu
                      visible={costId === item.id}
                      onButtonPress={() => setCostId(item.id)}
                      onDismiss={() => setCostId(undefined)}
                      onMenuItemPress={(action) => handleMenuItemPress("cost", action, item.id)}
                    ></CustomMenu>
                  </View>
                </View>
              </ShadowView>
            )}
          />
        )}
      </View>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </WhiteSafeAreaView>
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
    fontSize: 11,
    marginBottom: 5,
  },
  memoText: {
    marginTop: 10,
    fontSize: 12,
  },
});

export default CalendarScreen;
