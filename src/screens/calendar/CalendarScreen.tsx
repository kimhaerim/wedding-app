import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { Color } from "../../enum";
import { ICheckList, ICost } from "../../interface/check-list.interface";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import CommonCalendar from "../../components/calendar/Calendar";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";

import { checkListMockData, costsMockData } from "../../mock/CheckListMockData";
import DayDetailModal from "../../modal/DayDetailModal";
import MonthlySummary from "../../components/common/MonthlySummary";

const CalendarScreen: React.FC = () => {
  const today = new Date();

  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const [selected, setSelected] = useState(today.toISOString().split("T")[0]);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1);

  const [checkLists, setCheckLists] = useState<ICheckList[]>(checkListMockData);
  const [costs, setCosts] = useState<ICost[]>(costsMockData);

  const [checkListAgendaList, setCheckListAgendaList] = useState<ICheckList[]>([]);
  const [costAgendaLists, setCostAgendaLists] = useState<ICost[]>([]);

  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    [selected]: { selected: true, disableTouchEvent: true },
  });

  const markedDate = useMemo(() => {
    const result: MarkedDates = {};
    checkLists.forEach((checkList) => {
      if (checkList.reservedDate) {
        const reservedDateString = checkList.reservedDate?.toISOString().split("T")[0];
        const isSelected = selected === reservedDateString;
        const dot = {
          key: `checkList-${checkList.id}`,
          color: Color.BLUE,
        };

        if (result[reservedDateString]) {
          result[reservedDateString].selected = isSelected;
          result[reservedDateString].dots?.push(dot);
        } else if (!result[reservedDateString]) {
          result[reservedDateString] = { selected: isSelected, marked: true, dots: [dot] };
        }
      }
    });

    costs.forEach((cost) => {
      if (cost.paymentDate) {
        const paymentDateString = cost.paymentDate?.toISOString().split("T")[0];
        const isSelected = selected === paymentDateString;
        const dot = {
          key: `cost-${cost.id}`,
          color: Color.RED,
        };

        if (result[paymentDateString]) {
          result[paymentDateString].selected = isSelected;
          result[paymentDateString].dots?.push(dot);
        } else if (!result[paymentDateString]) {
          result[paymentDateString] = { selected: isSelected, marked: true, dots: [dot] };
        }
      }
    });

    return result;
  }, [checkLists, costs]);

  const checkListCount = { allCount: 20, completedCount: 15, incompleteCount: 5 };

  const onMonthChange = useCallback(
    (date: DateData) => {
      setCurrentYear(date.year);
      setCurrentMonth(date.month);
      console.log(currentMonth);
    },
    [currentMonth]
  );

  useEffect(() => {
    const checkListSections: ICheckList[] = checkLists.filter((checkList) => {
      const reservedDateString = checkList.reservedDate?.toISOString().split("T")[0];

      return reservedDateString === selected;
    });
    setCheckListAgendaList(checkListSections);

    const costSections: ICost[] = costs.filter((cost) => {
      const paymentDateString = cost.paymentDate?.toISOString().split("T")[0];
      return paymentDateString === selected;
    });
    setCostAgendaLists(costSections);
  }, [selected]);

  useEffect(() => {
    const markedDates = { [selected]: { selected: true, disableTouchEvent: true }, ...markedDate };
    setMarkedDates(markedDates);
  }, [selected]);

  const onDayPress = useCallback(
    (date: string) => {
      setSelected(date);
      setShowDetailModal(true);
    },
    [setSelected, setShowDetailModal]
  );

  return (
    <WhiteSafeAreaView>
      <View style={{ marginHorizontal: 20 }}>
        <MonthlySummary
          currentMonth={currentMonth}
          checkListCount={{
            allCount: checkListCount.allCount,
            completedCount: checkListCount.completedCount,
            incompleteCount: checkListCount.incompleteCount,
          }}
          paymentSummary={{
            totalAmount: 200000,
            completedAmount: 100000,
            pendingAmount: 100000,
          }}
        />

        <CommonCalendar
          markedDates={markedDates}
          onMonthChange={onMonthChange}
          onDayPress={(date: DateData) => onDayPress(date.dateString)}
        ></CommonCalendar>

        <DayDetailModal
          selectedDate={selected}
          isVisible={showDetailModal}
          checkList={checkListAgendaList}
          costs={costAgendaLists}
          onHide={() => setShowDetailModal(false)}
        />
      </View>
    </WhiteSafeAreaView>
  );
};

export default CalendarScreen;
