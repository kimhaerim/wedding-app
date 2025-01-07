import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import { Color } from "../enum";
import { AgreeToTermsScreen, ConfirmSignupScreen, EmailLoginScreen, LoginScreen, SignupScreen } from "../screens/auth";

import { StyleSheet } from "react-native";
import { DefaultCategoriesScreen } from "../screens/category";
import { ProfileScreen } from "../screens/my-page";
import { RootStackParamList } from "./interface";
import { TabNavigator } from "./TabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
    headerStyle: [styles.headerStyle],
  };

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="AgreeToTerms"
        component={AgreeToTermsScreen}
        options={{ ...defaultOptions, headerTitle: "약관동의" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ ...defaultOptions, headerTitle: "이메일 회원가입" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ ...defaultOptions, headerTitle: "프로필 정보 입력" }}
      />
      <Stack.Screen
        name="DefaultCategories"
        component={DefaultCategoriesScreen}
        options={{ ...defaultOptions, headerTitle: "기본 카테고리 설정" }}
      />
      <Stack.Screen
        name="ConfirmSignup"
        component={ConfirmSignupScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerLeft: () => <IconButton icon="close" size={20} onPress={() => navigation.navigate("Login")} />,
        })}
      />
      <Stack.Screen
        name="EmailLogin"
        component={EmailLoginScreen}
        options={{ ...defaultOptions, headerTitle: "이메일 로그인" }}
      />

      <Stack.Screen name="CategoryLists" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
});
