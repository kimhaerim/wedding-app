import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import EmailLoginScreen from "./src/screens/EmailLogin";
import LoginScreen from "./src/screens/Login";
import AgreeToTermsScreen from "./src/screens/AgreeToTerms";
import SingupScreen from "./src/screens/Signup";

export default function App() {
  return (
    <NavigationContainer>
      <LoginScreen></LoginScreen>
    </NavigationContainer>
  );
}
