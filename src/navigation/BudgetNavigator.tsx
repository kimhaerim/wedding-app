import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Color } from "../enum";
import { CategoryScreen, EditCategoryScreen } from "../screens/category";
import { CheckListScreen, EditCheckListScreen } from "../screens/check-list";
import { BudgetScreen, EditCostScreen } from "../screens/cost";
import { BudgetStackParamList } from "./interface/BudgetStackParamList";

const BudgetStack = createStackNavigator<BudgetStackParamList>();

export const BudgetNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen
        name="BudgetHome"
        component={BudgetScreen}
        options={{ ...defaultOptions, headerTitle: "예산 / 지출" }}
      />
      <BudgetStack.Screen
        name="CategoryDetail"
        component={CategoryScreen}
        options={{ ...defaultOptions, headerTitle: "예산 / 지출" }}
      />
      <BudgetStack.Screen
        name="CheckListDetail"
        component={CheckListScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />
      <BudgetStack.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={defaultOptions}
        initialParams={{ fromNavigator: "BudgetHome" }}
      />
      <BudgetStack.Screen
        name="EditCheckList"
        component={EditCheckListScreen}
        options={{ ...defaultOptions }}
        initialParams={{ fromNavigator: "BudgetHome" }}
      />
      <BudgetStack.Screen
        name="EditCost"
        component={EditCostScreen}
        options={{ ...defaultOptions }}
        initialParams={{ fromNavigator: "BudgetHome" }}
      />
    </BudgetStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});
