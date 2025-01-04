import { createStackNavigator } from "@react-navigation/stack";
import { CheckListStackParamList } from "./types";
import { Color } from "../enum";
import EditCheckListScreen from "../screens/check-list/EditCheckListScreen";
import CheckListsScreen from "../screens/check-list/CheckListsScreen";
import { StyleSheet } from "react-native";
import CheckListScreen from "../screens/check-list/CheckListScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";

const Stack = createStackNavigator<CheckListStackParamList>();

const CheckListNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CheckListsHome"
        component={CheckListsScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />

      <Stack.Screen name="EditCheckList" component={EditCheckListScreen} options={{ ...defaultOptions }} />

      <Stack.Screen
        name="CheckListDetail"
        component={CheckListScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});

export default CheckListNavigator;
