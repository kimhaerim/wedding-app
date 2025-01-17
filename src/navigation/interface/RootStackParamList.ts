import { NavigatorScreenParams } from "@react-navigation/native";
import { BudgetStackParamList } from "./BudgetStackParamList";
import { CalendarStackParamList } from "./CalendarStackParamList";
import { CheckListStackParamList } from "./CheckListStackParamList";

export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type RootStackParamList = {
  default: undefined;
  AuthNavigator: undefined;
  MainNavigator: undefined;
  CheckListNavigator: NavigationPropType<CheckListStackParamList>;
  CalendarNavigator: NavigatorScreenParams<CalendarStackParamList>;
  BudgetNavigator: NavigatorScreenParams<BudgetStackParamList>;
};
