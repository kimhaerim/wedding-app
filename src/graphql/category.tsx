import { gql } from "@apollo/client";

export const MutationAddCategories = gql`
  mutation addCategories($categories: [AddCategoryArgs!]!) {
    addCategories(categories: $categories)
  }
`;

export const QueryGetCategories = gql`
  query getCategories {
    categories {
      id
      title
    }
  }
`;
