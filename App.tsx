import { NavigationContainer } from "@react-navigation/native";
import ConfirmSignupScreen from "./src/screens/auth/ConfirmSignup";
import CheckLists from "./src/screens/check-list/CheckLists";
import EditCheckLists from "./src/screens/check-list/EditCheckLists";
import EmailLoginScreen from "./src/screens/auth/EmailLogin";
import LoginScreen from "./src/screens/auth/Login";
import CategoryLists from "./src/screens/category/CategoryLists";
import EditCategory from "./src/screens/category/EditCategory";
import CategoryWithCheckLists from "./src/screens/category/CategoryWithCheckLists";
import AgreeToTermsScreen from "./src/screens/auth/AgreeToTerms";
import SignupProfileScreen from "./src/screens/auth/SignupProfile";
import SignupScreen from "./src/screens/auth/Signup";
import { PaperProvider } from "react-native-paper";
import EditCost from "./src/screens/cost/EditCost";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <EditCost></EditCost>
      </NavigationContainer>
    </PaperProvider>
  );
}
