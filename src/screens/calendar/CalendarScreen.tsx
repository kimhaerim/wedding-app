import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { DateData, MarkedDates } from "react-native-calendars/src/types";
import CommonCalendar from "../../components/calendar/Calendar";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { CheckListOrderBy, Color, OrderOption } from "../../enum";

import { useQuery } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native-paper";
import MonthlySummary from "../../components/common/MonthlySummary";
import { QueryGetTotalCategoryBudget } from "../../graphql/category";
import { QueryCheckListCount, QueryDailyCheckListByMonth } from "../../graphql/checkList";
import { QueryDailyCostsByMonth } from "../../graphql/cost";
import { ICategoryBudgetDetails, ICheckList, ICost } from "../../interface";
import DayDetailModal from "../../modal/DayDetailModal";

export const CalendarScreen: React.FC = () => {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1);

  const { data: dailyCheckList, refetch: refetchCheckList } = useQuery<{
    dailyCheckListByMonth: { reservedDate: string; checkLists: ICheckList[] }[];
  }>(QueryDailyCheckListByMonth, {
    variables: {
      targetYear: currentYear,
      targetMonth: currentMonth,
      orderBy: CheckListOrderBy.CREATED_AT,
      orderOption: OrderOption.DESC,
    },
  });

  const { data: dailyCost, refetch: refetchCost } = useQuery<{
    dailyCostsByMonth: { paymentDate: string; costs: ICost[] }[];
  }>(QueryDailyCostsByMonth, {
    variables: {
      targetYear: currentYear,
      targetMonth: currentMonth,
    },
  });

  const { data: checkListCount } = useQuery<{
    checkListCount: { totalCount: number; completedCount: number; incompleteCount: number };
  }>(QueryCheckListCount, {
    variables: { targetYear: currentYear, targetMonth: currentMonth },
  });

  const { data: categoryBudgetAmount } = useQuery<{ totalCategoryBudget: ICategoryBudgetDetails }>(
    QueryGetTotalCategoryBudget,
    {
      variables: { targetYear: currentYear, targetMonth: currentMonth },
    }
  );

  useFocusEffect(
    useCallback(() => {
      refetchCheckList();
      refetchCost();
    }, [])
  );
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const [selected, setSelected] = useState(today.toISOString().split("T")[0]);

  const [checkListAgendaList, setCheckListAgendaList] = useState<ICheckList[]>([]);
  const [costAgendaLists, setCostAgendaLists] = useState<ICost[]>([]);

  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    [selected]: { selected: true, disableTouchEvent: true },
  });

  const markedDate = useMemo(() => {
    if (!dailyCheckList?.dailyCheckListByMonth || !dailyCost?.dailyCostsByMonth) {
      return {};
    }

    const result: MarkedDates = {};
    dailyCheckList.dailyCheckListByMonth.forEach((checkList) => {
      const isSelected = selected === checkList.reservedDate;
      checkList.checkLists.some((data, i) => {
        const dot = {
          key: `checkList-${data.id}`,
          color: Color.BLUE,
        };

        if (result[checkList.reservedDate]) {
          result[checkList.reservedDate].selected = isSelected;
          result[checkList.reservedDate].dots?.push(dot);
        } else if (!result[checkList.reservedDate]) {
          result[checkList.reservedDate] = { selected: isSelected, marked: true, dots: [dot] };
        }

        return i === 4;
      });
    });

    dailyCost.dailyCostsByMonth.forEach((cost) => {
      const isSelected = selected === cost.paymentDate;

      cost.costs.some((data, i) => {
        const dot = {
          key: `cost-${data.id}`,
          color: Color.RED,
        };

        if (result[cost.paymentDate]) {
          result[cost.paymentDate].selected = isSelected;
          result[cost.paymentDate].dots?.push(dot);
        } else if (!result[cost.paymentDate]) {
          result[cost.paymentDate] = { selected: isSelected, marked: true, dots: [dot] };
        }

        return i === 4;
      });
    });

    return result;
  }, [dailyCheckList, dailyCost, selected]);

  const onMonthChange = useCallback(
    (date: DateData) => {
      setCurrentYear(date.year);
      setCurrentMonth(date.month);
    },
    [currentMonth]
  );

  useEffect(() => {
    if (dailyCheckList) {
      const checkListSections: ICheckList[] = dailyCheckList.dailyCheckListByMonth
        .filter((checkList) => selected === checkList.reservedDate)
        .flatMap((checkList) => checkList.checkLists);
      setCheckListAgendaList(checkListSections);
    }

    if (dailyCost) {
      const costSections: ICost[] = dailyCost.dailyCostsByMonth
        .filter((cost) => cost.paymentDate === selected)
        .flatMap((cost) => cost.costs);
      setCostAgendaLists(costSections);
    }
  }, [selected]);

  useEffect(() => {
    const markedDates = { [selected]: { selected: true, disableTouchEvent: true }, ...markedDate };
    setMarkedDates(markedDates);
  }, [selected, dailyCheckList, dailyCost]);

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
            allCount: checkListCount?.checkListCount.totalCount ?? 0,
            completedCount: checkListCount?.checkListCount.completedCount ?? 0,
            incompleteCount: checkListCount?.checkListCount.incompleteCount ?? 0,
          }}
          paymentSummary={{
            completedAmount: categoryBudgetAmount?.totalCategoryBudget?.paidCost ?? 0,
            pendingAmount: categoryBudgetAmount?.totalCategoryBudget?.unpaidCost ?? 0,
          }}
        />

        <View style={[styles.legendContainer]}>
          <View style={[styles.legendDot]}></View>
          <Text style={[styles.legendText]}>체크리스트</Text>
        </View>

        <View style={[styles.legendContainer]}>
          <View style={[styles.legendDot, { backgroundColor: Color.RED }]}></View>
          <Text style={[styles.legendText]}>지출 내역</Text>
        </View>

        <CommonCalendar
          markedDates={markedDates}
          onMonthChange={onMonthChange}
          onDayPress={(date: DateData) => onDayPress(date.dateString)}
        ></CommonCalendar>

        <DayDetailModal
          fromNavigator={"CalendarHome"}
          selectedDate={selected}
          isVisible={showDetailModal}
          checkList={checkListAgendaList}
          costs={costAgendaLists}
          hideModal={() => setShowDetailModal(false)}
        />
      </View>
    </WhiteSafeAreaView>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendDot: { width: 10, height: 10, backgroundColor: Color.BLUE, borderRadius: 5, marginHorizontal: 20 },
  legendText: {
    fontSize: 12,
  },
});
