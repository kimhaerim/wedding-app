import { createStackNavigator } from "@react-navigation/stack";
import { CalendarStackParamList } from "./types";
import { Color } from "../enum";
import EditCheckListScreen from "../screens/check-list/EditCheckListScreen";
import { StyleSheet } from "react-native";
import CheckListScreen from "../screens/check-list/CheckListScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import EditCostScreen from "../screens/cost/EditCostScreen";

const Stack = createStackNavigator<CalendarStackParamList>();

const CalendarNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarHome"
        component={CalendarScreen}
        options={{ ...defaultOptions, headerTitle: "캘린더" }}
      />

      <Stack.Screen name="EditCheckList" component={EditCheckListScreen} options={{ ...defaultOptions }} />
      <Stack.Screen
        name="CheckListDetail"
        component={CheckListScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />

      <Stack.Screen name="EditCost" component={EditCostScreen} options={{ ...defaultOptions }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});

export default CalendarNavigator;
