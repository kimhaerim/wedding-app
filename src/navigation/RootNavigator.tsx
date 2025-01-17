import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { isLoggedIn } from "../common/tokenUtil";
import { AuthNavigator } from "./AuthNavigator";
import { RootStackParamList } from "./interface";
import { MainBottomTabNavigator } from "./MainBottomTabNavigator";

export type RootStackNavigationProps<T extends keyof RootStackParamList = "default"> = StackNavigationProp<
  RootStackParamList,
  T
>;
const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await isLoggedIn();
      setLoggedIn(result);
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loggedIn ? (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="MainNavigator" component={MainBottomTabNavigator} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});
