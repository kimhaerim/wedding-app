import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { RootNavigator, TabNavigator } from "./src/navigation";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? <TabNavigator /> : <RootNavigator setIsLoggedIn={setIsLoggedIn} />}
      </NavigationContainer>
    </PaperProvider>
  );
}
