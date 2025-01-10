import { gql } from "@apollo/client";

export const QueryGetCheckList = gql`
  query getCheckList($id: Int!) {
    checkList(id: $id) {
      id
      description
      reservedDate
      isCompleted
      memo
      status
      costs {
        amount
      }
    }
  }
`;

export const QueryGetCheckLists = gql`
  query getCheckLists($categoryId: Int, $offset: Int!, $limit: Int!) {
    checkLists(categoryId: $categoryId, offset: $offset, limit: $limit) {
      id
      description
      reservedDate
      isCompleted
      memo
      status
    }
  }
`;

export const MutationAddCheckList = gql`
  mutation addCheckList(
    $categoryId: Int
    $description: String!
    $reservedDate: DateTime
    $completedAt: String
    $memo: String
    $status: CheckListStatus
  ) {
    addCheckList(
      categoryId: $categoryId
      description: $description
      reservedDate: $reservedDate
      completedAt: $completedAt
      memo: $memo
      status: $status
    )
  }
`;

export const MutationUpdateCheckList = gql`
  mutation updateCheckList(
    $id: Int!
    $categoryId: Int
    $description: String
    $reservedDate: DateTime
    $completedAt: String
    $memo: String
    $status: CheckListStatus
  ) {
    updateCheckList(
      id: $id
      categoryId: $categoryId
      description: $description
      reservedDate: $reservedDate
      completedAt: $completedAt
      memo: $memo
      status: $status
    )
  }
`;
