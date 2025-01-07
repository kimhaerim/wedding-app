import { gql } from "@apollo/client";

export const QueryExistsUser = gql`
  query existsUser($email: String!) {
    existsUser(email: $email)
  }
`;

export const QueryLogin = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;
