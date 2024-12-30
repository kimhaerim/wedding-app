import { NavigationContainer } from "@react-navigation/native";
import ConfirmSignupScreen from "./src/screens/auth/ConfirmSignup";
import EditCheckLists from "./src/screens/check-list/EditCheckList";
import EmailLoginScreen from "./src/screens/auth/EmailLogin";
import LoginScreen from "./src/screens/auth/Login";
import CategoryLists from "./src/screens/category/CategoryLists";
import EditCategory from "./src/screens/category/EditCategory";
import AgreeToTermsScreen from "./src/screens/auth/AgreeToTerms";
import SignupProfileScreen from "./src/screens/auth/SignupProfile";
import SignupScreen from "./src/screens/auth/Signup";
import { PaperProvider } from "react-native-paper";
import EditCost from "./src/screens/cost/EditCost";
import EditCheckList from "./src/screens/check-list/EditCheckList";
import React from "react";
import DefaultCategories from "./src/screens/category/DefaultCategories";
import Calendar from "./src/screens/calendar/Calendar";
import CategoryWithCheckLists from "./src/screens/category/Category";
import CheckLists from "./src/screens/check-list/CheckLists";
import CheckList from "./src/screens/check-list/CheckList";
import Category from "./src/screens/category/Category";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <CategoryLists></CategoryLists>
      </NavigationContainer>
    </PaperProvider>
  );
}
