import { gql } from "@apollo/client";

export const QueryExistsUser = gql`
  query existsUser($email: String!) {
    existsUser(email: $email)
  }
`;
