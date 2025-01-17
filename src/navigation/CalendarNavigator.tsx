import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Color } from "../enum";
import { CalendarScreen } from "../screens/calendar";
import { CheckListScreen, EditCheckListScreen } from "../screens/check-list";
import { EditCostScreen } from "../screens/cost";
import { CalendarStackParamList } from "./interface";

const CalendarStack = createStackNavigator<CalendarStackParamList>();

export const CalendarNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarHome"
        component={CalendarScreen}
        options={{ ...defaultOptions, headerTitle: "캘린더" }}
      />
      <CalendarStack.Screen
        name="CheckListDetail"
        component={CheckListScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />
      <CalendarStack.Screen
        name="EditCheckList"
        component={EditCheckListScreen}
        options={{ ...defaultOptions }}
        initialParams={{ fromNavigator: "CalendarHome" }}
      />
      <CalendarStack.Screen
        name="EditCost"
        component={EditCostScreen}
        options={{ ...defaultOptions }}
        initialParams={{ fromNavigator: "CalendarHome" }}
      />
    </CalendarStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});
