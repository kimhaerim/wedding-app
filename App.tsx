import { NavigationContainer } from "@react-navigation/native";
import ConfirmSignupScreen from "./src/screens/auth/ConfirmSignup";
import CheckLists from "./src/screens/check-list/CheckLists";
import EditCheckLists from "./src/screens/check-list/EditCheckLists";
import EmailLoginScreen from "./src/screens/auth/EmailLogin";
import LoginScreen from "./src/screens/auth/Login";
import CategoryLists from "./src/screens/category/CategoryLists";
import EditCategory from "./src/screens/category/EditCategory";

export default function App() {
  return (
    <NavigationContainer>
      <EditCategory></EditCategory>
    </NavigationContainer>
  );
}
