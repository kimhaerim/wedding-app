import { createStackNavigator } from "@react-navigation/stack";
import { Color } from "../enum";
import CategoryListsScreen from "../screens/category/CategoryListsScreen";
import CategoryScreen from "../screens/category/CategoryScreen";
import EditCategoryScreen from "../screens/category/EditCategoryScreen";
import CheckListScreen from "../screens/check-list/CheckListScreen";
import EditCheckListScreen from "../screens/check-list/EditCheckListScreen";
import { CategoryStackParamList } from "./interface";

const Stack = createStackNavigator<CategoryStackParamList>();

const CategoryNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: {
      shadowColor: "transparent",
      elevation: 0,
    },
  };

  return (
    <Stack.Navigator initialRouteName="CategoryHome">
      <Stack.Screen
        name="CategoryHome"
        component={CategoryListsScreen}
        options={{ ...defaultOptions, headerTitle: "카테고리" }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryScreen}
        options={{ ...defaultOptions, headerTitle: "카테고리 상세" }}
      />
      <Stack.Screen name="EditCategory" component={EditCategoryScreen} options={defaultOptions} />

      <Stack.Screen
        name="CheckListDetail"
        component={CheckListScreen}
        options={{ ...defaultOptions, headerTitle: "체크리스트" }}
      />
      <Stack.Screen name="EditCheckList" component={EditCheckListScreen} options={defaultOptions} />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;
