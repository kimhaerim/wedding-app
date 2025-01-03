import { createStackNavigator } from "@react-navigation/stack";
import { CategoryStackParamList } from "./types";
import EditCategoryScreen from "../screens/category/EditCategoryScreen";
import { NavigationContainer } from "@react-navigation/native";
import CategoryListsScreen from "../screens/category/CategoryListsScreen";
import { Color } from "../enum";
import EditCheckListScreen from "../screens/check-list/EditCheckListScreen";

const Stack = createStackNavigator<CategoryStackParamList>();

const CategoryNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
  };

  return (
    <Stack.Navigator initialRouteName="CategoryHome">
      <Stack.Screen
        name="CategoryHome"
        component={CategoryListsScreen}
        options={{ ...defaultOptions, headerTitle: "카테고리" }}
      />
      <Stack.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={({ navigation }) => ({
          ...defaultOptions,
        })}
      />
      <Stack.Screen name="EditCheckList" component={EditCheckListScreen} options={defaultOptions} />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;
