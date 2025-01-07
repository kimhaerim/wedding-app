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

export const QueryUser = gql`
  query user {
    user {
      id
      email
      name
      birthday
      gender
      partner {
        id
      }
    }
  }
`;

export const MutationSignup = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String!
    $birthday: String
    $gender: Gender!
    $coupleId: Int
    $weddingDate: DateTime
    $coupleStartDate: String
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      birthday: $birthday
      gender: $gender
      coupleId: $coupleId
      weddingDate: $weddingDate
      coupleStartDate: $coupleStartDate
    ) {
      accessToken
    }
  }
`;
