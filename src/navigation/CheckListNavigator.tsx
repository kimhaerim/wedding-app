import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Color } from "../enum";
import { CheckListScreen, CheckListsScreen, EditCheckListScreen } from "../screens/check-list";
import { CheckListStackParamList } from "./interface";

const Stack = createStackNavigator<CheckListStackParamList>();

export const CheckListNavigator = () => {
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
