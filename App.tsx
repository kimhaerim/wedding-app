import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import ExpandableCalendarScreen from "./src/components/calendar/CalendarTemp";
import CalendarScreen from "./src/components/calendar/CalendarTemp";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // 로그인 상태 초기값을 false로 설정

  return (
    <PaperProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <TabNavigator /> // 로그인 후 TabNavigator 표시
        ) : (
          <RootNavigator setIsLoggedIn={setIsLoggedIn} /> // 로그인되지 않았을 때 RootNavigator 표시
        )}
        {/* <CalendarScreen></CalendarScreen> */}
      </NavigationContainer>
    </PaperProvider>
  );
}
