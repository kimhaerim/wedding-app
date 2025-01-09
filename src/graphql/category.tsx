import { gql } from "@apollo/client";

export const MutationAddCategories = gql`
  mutation addCategories($categories: [AddCategoryArgs!]!) {
    addCategories(categories: $categories)
  }
`;

export const MutationAddCategory = gql`
  mutation addCategory($title: String!, $budgetAmount: Int) {
    addCategory(title: $title, budgetAmount: $budgetAmount)
  }
`;

export const MutationUpdateCategory = gql`
  mutation updateCategory($id: Int!, $title: String, $budgetAmount: Int) {
    updateCategory(id: $id, title: $title, budgetAmount: $budgetAmount)
  }
`;

export const QueryGetCategories = gql`
  query getCategories {
    categories {
      id
      budgetAmount
      title
    }
  }
`;

export const QueryGetCategory = gql`
  query getCategory($id: Int!) {
    category(id: $id) {
      id
      budgetAmount
      title
      checkList {
        id
        description
        reservedDate
        isCompleted
        memo
        status
        costs {
          amount
          paymentDate
          memo
          costType
        }
      }
    }
  }
`;
