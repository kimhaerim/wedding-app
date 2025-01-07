import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { isLoggedIn } from "./src/common/tokenUtil";
import client from "./src/graphql/apolloClient";
import { RootNavigator, TabNavigator } from "./src/navigation";

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // 초기값을 null로 설정

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await isLoggedIn();
      setLoggedIn(result);
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <PaperProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>{loggedIn ? <TabNavigator /> : <RootNavigator />}</NavigationContainer>
        </ApolloProvider>
      </PaperProvider>
      <Toast />
    </>
  );
}
