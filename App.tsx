import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import BudgetScreen from "./src/screens/cost/Budget";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <BudgetScreen></BudgetScreen>
      </NavigationContainer>
    </PaperProvider>
  );
}
