import { createStackNavigator } from "@react-navigation/stack";
import { Color } from "../enum";

import { CategoryListsScreen, CategoryScreen, EditCategoryScreen } from "../screens/category";
import { CheckListScreen, EditCheckListScreen } from "../screens/check-list";
import { CategoryStackParamList } from "./interface";

const Stack = createStackNavigator<CategoryStackParamList>();

export const CategoryNavigator = () => {
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
