import { gql } from "@apollo/client";

export const QueryGetCOst = gql`
  query cost($id: Int!) {
    cost(id: $id) {
      id
      title
      amount
      paymentDate
      memo
      costType
    }
  }
`;

export const MutationAddCost = gql`
  mutation addCost(
    $title: String!
    $categoryId: Int
    $checkListId: Int
    $amount: Int!
    $paymentDate: String
    $memo: String
    $costType: CostType!
  ) {
    addCost(
      title: $title
      categoryId: $categoryId
      checkListId: $checkListId
      amount: $amount
      paymentDate: $paymentDate
      memo: $memo
      costType: $costType
    )
  }
`;

export const MutationUpdateCost = gql`
  mutation updateCost(
    $id: Int!
    $title: String
    $categoryId: Int
    $checkListId: Int
    $amount: Int
    $paymentDate: DateTime
    $memo: String
    $costType: CostType
  ) {
    updateCost(
      id: $id
      title: $title
      categoryId: $categoryId
      checkListId: $checkListId
      amount: $amount
      paymentDate: $paymentDate
      memo: $memo
      costType: $costType
    )
  }
`;
