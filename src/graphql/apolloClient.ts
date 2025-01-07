import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NextLink, Operation } from "@apollo/client";
import { from, mergeMap } from "rxjs";
import { getTokens } from "../common/tokenUtil";

const authMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {
  return from(getTokens()).pipe(
    mergeMap((tokens: { accessToken: string; refreshToken: string }) => {
      if (tokens) {
        operation.setContext({
          headers: {
            ...operation.getContext().headers,
            authorization: `Bearer ${tokens.accessToken}`,
            refresh: tokens.refreshToken,
          },
        });
      }

      return forward(operation);
    })
  );
});

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
