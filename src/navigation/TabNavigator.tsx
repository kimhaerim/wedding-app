import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetScreen from "../screens/cost/Budget";
import { Icon, Text } from "react-native-paper";
import { Color } from "../enum";
import CategoryNavigator from "./CategoryNavigator";
import CheckListNavigator from "./CheckListNavigator";
import MyPageNavigator from "./MyPageNavigation";
import CalendarNavigator from "./CalendarNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const getTabBarStyle = (focused: boolean) => {
    return focused ? Color.BLUE : Color.DARK_GRAY;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: "black",
        },
      }}
    >
      <Tab.Screen
        name="checkLists"
        component={CheckListNavigator}
        initialParams={{ initialRouteName: "CheckListHome" }}
        options={{
          tabBarIcon: ({ size, focused }) => <Icon source="check-circle" size={size} color={getTabBarStyle(focused)} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: getTabBarStyle(focused), fontSize: 10, marginTop: 2 }}>체크리스트</Text>
          ),
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.reset({
              index: 0,
              routes: [{ name: "checkLists" }],
            });
          },
        })}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarNavigator}
        initialParams={{ initialRouteName: "CheckListHome" }}
        options={{
          tabBarIcon: ({ size, focused }) => <Icon source="calendar" size={size} color={getTabBarStyle(focused)} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: getTabBarStyle(focused), fontSize: 10, marginTop: 2 }}>캘린더</Text>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="CategoryLists"
        component={CategoryNavigator}
        options={{
          tabBarIcon: ({ size, focused }) => <Icon source="folder" size={size} color={getTabBarStyle(focused)} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: getTabBarStyle(focused), fontSize: 10, marginTop: 2 }}>카테고리</Text>
          ),
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();

            navigation.reset({
              index: 0,
              routes: [{ name: "CategoryLists" }],
            });
          },
        })}
      />

      <Tab.Screen
        name="예산 / 지출"
        component={BudgetScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <Icon source="cash" size={size} color={getTabBarStyle(focused)} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: getTabBarStyle(focused), fontSize: 10, marginTop: 2 }}>예산 / 지출</Text>
          ),
          headerTitle: "예산 / 지출",
        }}
      />

      <Tab.Screen
        name="마이페이지"
        component={MyPageNavigator}
        options={{
          tabBarIcon: ({ size, focused }) => <Icon source="account" size={size} color={getTabBarStyle(focused)} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: getTabBarStyle(focused), fontSize: 10, marginTop: 2 }}>마이페이지</Text>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
