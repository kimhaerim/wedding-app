import { Calendar, LocaleConfig } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { Color } from "../../enum";

LocaleConfig.locales["ko"] = {
  monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

interface CommonCalendarProps {
  markedDates: MarkedDates;
  onMonthChange: (date: DateData) => void;
  onDayPress: (day: DateData) => void;
}

const CommonCalendar: React.FC<CommonCalendarProps> = (props) => {
  const { markedDates, onMonthChange, onDayPress } = props;
  return (
    <Calendar
      style={{ height: 300 }}
      theme={{
        backgroundColor: Color.WHITE,
        calendarBackground: Color.WHITE,
        textSectionTitleColor: "#b6c1cd",
        selectedDayBackgroundColor: Color.BLUE200,
        selectedDayTextColor: Color.WHITE,
        todayTextColor: "#00adf5",
        dayTextColor: "#2d4150",
        textDisabledColor: Color.DARK_GRAY,
      }}
      monthFormat="yyyy.MM"
      onMonthChange={onMonthChange}
      onDayPress={onDayPress}
      markingType={"multi-dot"}
      markedDates={markedDates}
    />
  );
};

export default CommonCalendar;
