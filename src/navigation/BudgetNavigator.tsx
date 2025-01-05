import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Color } from "../enum";
import { CategoryScreen, EditCategoryScreen } from "../screens/category";
import { BudgetScreen } from "../screens/cost";
import { BudgetStackParamList } from "./interface/BudgetStackParamList";

const Stack = createStackNavigator<BudgetStackParamList>();

export const BudgetNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BudgetHome"
        component={BudgetScreen}
        options={{ ...defaultOptions, headerTitle: "예산 / 지출" }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryScreen}
        options={{ ...defaultOptions, headerTitle: "예산 / 지출" }}
      />
      <Stack.Screen name="EditCategory" component={EditCategoryScreen} options={defaultOptions} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});
