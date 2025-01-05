import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Color } from "../enum";
import { InviteScreen, MyPageScreen } from "../screens/my-page";
import { MyPageStackParamList } from "./interface";

const Stack = createStackNavigator<MyPageStackParamList>();

export const MyPageNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <Stack.Navigator initialRouteName="MyPageHome">
      <Stack.Screen
        name="MyPageHome"
        component={MyPageScreen}
        options={{ ...defaultOptions, headerTitle: "마이페이지" }}
      />
      <Stack.Screen name="Invite" component={InviteScreen} options={defaultOptions} />
      {/* <Stack.Screen name="EditProfile" component={ProfileScreen} options={defaultOptions} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});
