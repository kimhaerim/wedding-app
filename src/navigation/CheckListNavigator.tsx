import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Color } from "../enum";
import { CheckListScreen, CheckListsScreen, EditCheckListScreen } from "../screens/check-list";
import { EditCostScreen } from "../screens/cost";
import { CheckListStackParamList } from "./interface";

const CheckListStack = createStackNavigator<CheckListStackParamList>();

export const CheckListNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <CheckListStack.Navigator>
      <CheckListStack.Screen
        name="CheckListsHome"
        component={CheckListsScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />
      <CheckListStack.Screen
        name="CheckListDetail"
        component={CheckListScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트 상세" }}
      />
      <CheckListStack.Screen
        name="EditCheckList"
        component={EditCheckListScreen}
        initialParams={{ fromNavigator: "CheckListsHome" }}
        options={{ ...defaultOptions }}
      />
      <CheckListStack.Screen
        name="EditCost"
        component={EditCostScreen}
        options={{ ...defaultOptions }}
        initialParams={{ fromNavigator: "CheckListsHome" }}
      />
    </CheckListStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});
