import { createStackNavigator } from "@react-navigation/stack";
import { MyPageStackParamList } from "./types";
import { Color } from "../enum";
import { StyleSheet } from "react-native";
import MyPageScreen from "../screens/my-page/MyPageScreen";
import InviteScreen from "../screens/my-page/InviteScreen";
import ProfileScreen from "../screens/my-page/ProfileScreen";

const Stack = createStackNavigator<MyPageStackParamList>();

const MyPageNavigator = () => {
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
      <Stack.Screen name="EditProfile" component={ProfileScreen} options={defaultOptions} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});

export default MyPageNavigator;
