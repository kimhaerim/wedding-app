import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CalendarType } from "../../enum/calendar.enum";
import { Color } from "../../enum";
import { Text } from "react-native-paper";

import Button from "../common/Button";
import SummaryCard from "../common/SummaryCard";

interface CalendarHeaderProps {
  calendarType: CalendarType;
  setCalendarType: (type: CalendarType) => void;
  currentMonth: number;
  summaryData: { total: string; items: { label: string; value: string }[] };
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  calendarType,
  setCalendarType,
  currentMonth,
  summaryData,
}) => (
  <View>
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

    <SummaryCard title={`${currentMonth}월 요약`} data={summaryData} />
  </View>
);

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
  borderBottom: {
    width: "50%",
    borderBottomWidth: 2,
  },
});
export default CalendarHeader;
