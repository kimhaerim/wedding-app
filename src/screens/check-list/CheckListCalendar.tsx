import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { CheckListStatus, Color } from "../../enum";
import { ICheckList } from "../../interface/check-list.interface";
import Row from "../../components/Row";
import { DateData, MarkedDates } from "react-native-calendars/src/types";

LocaleConfig.locales["ko"] = {
  monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};

LocaleConfig.defaultLocale = "ko";

interface MarkedDate {
  selected: boolean;
  dots: { key: string; color: Color }[];
  marked: boolean;
}

const CustomCalendar = () => {
  const today = new Date();
  const [selected, setSelected] = useState(today.toISOString().split("T")[0]);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1);

  const checkLists: ICheckList[] = [
    {
      id: 1,
      description: "사진보라",
      isCompleted: true,
      memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
      reservedDate: new Date("2024-12-01"),
      status: CheckListStatus.CONFIRMED,
      costs: [],
    },
    {
      id: 2,
      description: "사진보라",
      isCompleted: false,
      memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
      reservedDate: new Date("2024-12-10"),
      status: CheckListStatus.REJECTED,
      costs: [],
    },
    {
      id: 3,
      description: "사진보라",
      isCompleted: true,
      memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
      reservedDate: new Date("2024-12-10"),
      status: CheckListStatus.REJECTED,
      costs: [],
    },
  ];

  const markedData = checkLists.reduce((acc: { [key: string]: MarkedDate }, cur) => {
    if (!cur.reservedDate) {
      return acc;
    }

    const reservedDate = cur.reservedDate.toISOString().split("T")[0];
    const isSelected = selected === reservedDate;
    const dot = {
      key: cur.isCompleted ? "completed" : "notCompleted",
      color: cur.isCompleted ? Color.BLUE : Color.RED,
    };
    if (!acc[reservedDate]) {
      acc[reservedDate] = {
        selected: isSelected,
        marked: true,
        dots: [dot],
      };

      return acc;
    }

    acc[reservedDate].dots.push(dot);
    return acc;
  }, {});

  const markedDates: MarkedDates = {
    [selected]: { selected: true, disableTouchEvent: true },
    ...markedData,
  };

  const checkListCount = { allCount: 20, completedCount: 15, incompleteCount: 5 };

  const onMonthChange = useCallback(
    (date: DateData) => {
      setCurrentYear(date.year);
      setCurrentMonth(date.month);
    },
    [currentMonth]
  );

  useEffect(() => {
    console.log("useEffect", currentYear);
    console.log("useEffect", currentMonth);
  }, [currentMonth]);

  return (
    <CenteredSafeArea>
      <ScrollView>
        <View style={{ margin: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>체크리스트</Text>
          <View
            style={{
              marginTop: 10,
              backgroundColor: Color.BLUE100,
              padding: 20,
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            <Row style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>{today.getMonth() + 1}월 체크리스트</Text>
              <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>
                {checkListCount.allCount}개
              </Text>
            </Row>
            <Row style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>완료</Text>
              <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>
                {checkListCount.completedCount}개
              </Text>
            </Row>
            <Row>
              <Text style={{ fontSize: 12, flex: 0, fontWeight: "bold" }}>미완료</Text>
              <Text style={{ fontSize: 12, flex: 1, textAlign: "right", marginRight: 15 }}>
                {checkListCount.incompleteCount}개
              </Text>
            </Row>
          </View>

          <Calendar
            style={{
              height: 350,
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: Color.BLUE200,
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: Color.DARK_GRAY,
            }}
            monthFormat="yyyy.M"
            onMonthChange={onMonthChange}
            // 다른 props들...
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markingType={"multi-dot"}
            markedDates={markedDates}
          />
        </View>
      </ScrollView>
    </CenteredSafeArea>
  );
};

export default CustomCalendar;
