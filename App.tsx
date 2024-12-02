import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import Login from "./src/screens/Login";
import EmailLoginScreen from "./src/screens/EmailLogin";
import LoginScreen from "./src/screens/Login";

export default function App() {
  return (
    <NavigationContainer>
      <EmailLoginScreen></EmailLoginScreen>
    </NavigationContainer>
  );
}
