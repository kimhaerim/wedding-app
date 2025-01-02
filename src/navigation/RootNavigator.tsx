import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { Color } from "../enum";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import AgreeToTermsScreen from "../screens/auth/AgreeToTermsScreen";
import ProfileScreen from "../screens/my-page/ProfileScreen";
import DefaultCategoriesScreen from "../screens/category/DefaultCategoriesScreen";
import ConfirmSignupScreen from "../screens/auth/ConfirmSignupScreen";
import EmailLoginScreen from "../screens/auth/EmailLoginScreen";
import { IconButton } from "react-native-paper";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = ({ setIsLoggedIn }: { setIsLoggedIn: (loggedIn: boolean) => void }) => {
  const defaultOptions = {
    headerBackTitle: "",
    headerTintColor: Color.BLACK,
  };

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={(props: any) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen name="EmailLogin" initialParams={{ setIsLoggedIn }}>
        {(props) => <EmailLoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen name="CategoryLists" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
