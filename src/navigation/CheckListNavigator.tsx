import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Color } from "../enum";
import CheckListScreen from "../screens/check-list/CheckListScreen";
import CheckListsScreen from "../screens/check-list/CheckListsScreen";
import EditCheckListScreen from "../screens/check-list/EditCheckListScreen";
import { CheckListStackParamList } from "./interface";

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
        options={{ ...defaultOptions, headerTitle: "체크리스트 상세" }}
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
