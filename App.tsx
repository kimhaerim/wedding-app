import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";
import TabNavigator from "./src/navigation/TabNavigator";

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
