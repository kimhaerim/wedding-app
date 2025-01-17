import { ApolloProvider } from "@apollo/client";
import React from "react";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { SignupProvider } from "./src/context/SignupContext";
import client from "./src/graphql/apolloClient";
import { RootNavigator } from "./src/navigation";

export default function App() {
  return (
    <>
      <SignupProvider>
        <PaperProvider>
          <ApolloProvider client={client}>
            <RootNavigator />
          </ApolloProvider>
        </PaperProvider>
      </SignupProvider>
      <Toast />
    </>
  );
}
