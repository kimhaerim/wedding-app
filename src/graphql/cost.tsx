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
      isIncludeBudget
    }
  }
`;

export const QueryDailyCostsByMonth = gql`
  query getDailyCostsByMonth($targetYear: Int!, $targetMonth: Int!) {
    dailyCostsByMonth(targetYear: $targetYear, targetMonth: $targetMonth) {
      paymentDate
      costs {
        id
        title
        amount
        paymentDate
        memo
        costType
        isIncludeBudget
      }
    }
  }
`;

export const MutationAddCost = gql`
  mutation addCost(
    $title: String!
    $checkListId: Int!
    $amount: Int!
    $paymentDate: String
    $memo: String
    $costType: CostType!
    $isIncludeBudget: Boolean
  ) {
    addCost(
      title: $title
      checkListId: $checkListId
      amount: $amount
      paymentDate: $paymentDate
      memo: $memo
      costType: $costType
      isIncludeBudget: $isIncludeBudget
    )
  }
`;

export const MutationUpdateCost = gql`
  mutation updateCost(
    $id: Int!
    $title: String
    $checkListId: Int!
    $amount: Int
    $paymentDate: DateTime
    $memo: String
    $costType: CostType
    $isIncludeBudget: Boolean
  ) {
    updateCost(
      id: $id
      title: $title
      checkListId: $checkListId
      amount: $amount
      paymentDate: $paymentDate
      memo: $memo
      costType: $costType
      isIncludeBudget: $isIncludeBudget
    )
  }
`;
