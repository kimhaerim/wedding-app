import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
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

const Calendar = () => {
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
    <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        <View style={{ margin: 20 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center", marginBottom: 20 }}>캘린더</Text>
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

          {calendarType === CalendarType.CHECK_LIST &&
            checkListAgendaList.map((checkList) => (
              <View key={`checkList-${checkList.id}`}>
                <Row>
                  <Text style={{ fontSize: 10 }}>{checkList.reservedTime}</Text>
                  <Text style={{ fontSize: 10, marginLeft: 10, color: checkList.isCompleted ? Color.BLUE : Color.RED }}>
                    {checkList.isCompleted ? "완료" : "미완료"}
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
                  <CheckBox
                    label={checkList.description}
                    isChecked={checkList.isCompleted}
                    onPress={() => console.log("클릭")}
                  />
                  <CustomMenu
                    visible={checkListId === checkList.id}
                    onButtonPress={() => setCheckListId(checkList.id)}
                    onDismiss={() => setCheckListId(undefined)}
                    onMenuItemPress={(action) => handleMenuItemPress("checkList", action, checkList.id)}
                  ></CustomMenu>
                </View>
                <Divider style={{ marginBottom: 20 }} />
              </View>
            ))}

          {calendarType === CalendarType.COST &&
            costAgendaLists.map((cost) => (
              <View key={`cost-${cost.id}`}>
                <Row>
                  <Text style={{ fontSize: 10 }}>{covertCostType(cost.costType)}</Text>
                  <Text style={{ fontSize: 10, marginLeft: 10, color: cost.paymentDate ? Color.BLUE : Color.RED }}>
                    {cost.paymentDate ? "결제 완료" : "결제 전"}
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
                  <Text>{cost.title}</Text>
                  <Text style={{ textAlign: "right" }}>{formatCurrency(cost.amount)}</Text>
                  <CustomMenu
                    visible={costId === cost.id}
                    onButtonPress={() => setCostId(cost.id)}
                    onDismiss={() => setCostId(undefined)}
                    onMenuItemPress={(action) => handleMenuItemPress("cost", action, cost.id)}
                  ></CustomMenu>
                </View>

                <Divider />
              </View>
            ))}
        </View>
      </ScrollView>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>
    </SafeAreaView>
  );
};

export default Calendar;
