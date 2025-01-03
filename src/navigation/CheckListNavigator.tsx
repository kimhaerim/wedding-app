import { createStackNavigator } from "@react-navigation/stack";
import { CategoryStackParamList, CheckListStackParamList } from "./types";
import EditCategoryScreen from "../screens/category/EditCategoryScreen";
import { NavigationContainer } from "@react-navigation/native";
import CategoryListsScreen from "../screens/category/CategoryListsScreen";
import { Color } from "../enum";
import EditCheckListScreen from "../screens/check-list/EditCheckListScreen";
import CheckListsScreen from "../screens/check-list/CheckListsScreen";

const Stack = createStackNavigator<CheckListStackParamList>();

const CheckListNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
  };

  return (
    <Stack.Navigator initialRouteName="CheckLists">
      <Stack.Screen
        name="CheckLists"
        component={CheckListsScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />
      <Stack.Screen
        name="EditCheckList"
        component={EditCheckListScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트 저장" }}
      />
    </Stack.Navigator>
  );
};

export default CheckListNavigator;
