import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BudgetStackParamList } from "./BudgetStackParamList";
import { CalendarStackParamList } from "./CalendarStackParamList";
import { CheckListStackParamList } from "./CheckListStackParamList";

type CalendarEditCheckListNavigationProp = NativeStackNavigationProp<CalendarStackParamList, "EditCheckList">;
type CheckListEditCheckListNavigationProp = NativeStackNavigationProp<CheckListStackParamList, "EditCheckList">;
type BudgetEditCheckListNavigationProp = NativeStackNavigationProp<BudgetStackParamList, "EditCheckList">;

export type EditCheckListNavigationType = CompositeNavigationProp<
  CheckListEditCheckListNavigationProp,
  CompositeNavigationProp<BudgetEditCheckListNavigationProp, CalendarEditCheckListNavigationProp>
>;

export type EditCheckListRouteProp =
  | RouteProp<CalendarStackParamList, "EditCheckList">
  | RouteProp<CheckListStackParamList, "EditCheckList">
  | RouteProp<BudgetStackParamList, "EditCheckList">;

type CalendarEditCostNavigationProp = NativeStackNavigationProp<CalendarStackParamList, "EditCost">;
type CheckListEditCostNavigationProp = NativeStackNavigationProp<CheckListStackParamList, "EditCost">;
type BudgetEditCostNavigationProp = NativeStackNavigationProp<BudgetStackParamList, "EditCost">;

export type EditCostNavigationType = CompositeNavigationProp<
  CheckListEditCostNavigationProp,
  CompositeNavigationProp<BudgetEditCostNavigationProp, CalendarEditCostNavigationProp>
>;

export type EditCostRouteProp =
  | RouteProp<CalendarStackParamList, "EditCost">
  | RouteProp<CheckListStackParamList, "EditCost">
  | RouteProp<BudgetStackParamList, "EditCost">;
