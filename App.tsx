import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import BudgetScreen from "./src/screens/cost/Budget";
import MyPageScreen from "./src/screens/my-page/MyPageScreen";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyPageScreen></MyPageScreen>
      </NavigationContainer>
    </PaperProvider>
  );
}
