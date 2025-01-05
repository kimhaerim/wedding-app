import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import client from "./src/graphql/apolloClient";
import { RootNavigator, TabNavigator } from "./src/navigation";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {isLoggedIn ? <TabNavigator /> : <RootNavigator setIsLoggedIn={setIsLoggedIn} />}
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
}
