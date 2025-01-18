import { gql } from "@apollo/client";

export const QueryGetCheckList = gql`
  query getCheckList($id: Int!) {
    checkList(id: $id) {
      id
      description
      reservedDate
      isCompleted
      memo
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

export const QueryGetCheckLists = gql`
  query getCheckLists($categoryId: Int, $offset: Int!, $limit: Int!) {
    checkLists(categoryId: $categoryId, offset: $offset, limit: $limit) {
      id
      description
      reservedDate
      isCompleted
      memo
    }
  }
`;

export const QueryDailyCheckListByMonth = gql`
  query getDailyCheckListByMonth(
    $targetYear: Int!
    $targetMonth: Int!
    $orderBy: CheckListOrderBy!
    $orderOption: OrderOption!
  ) {
    dailyCheckListByMonth(
      targetYear: $targetYear
      targetMonth: $targetMonth
      orderBy: $orderBy
      orderOption: $orderOption
    ) {
      reservedDate
      checkLists {
        id
        description
        reservedDate
        isCompleted
        memo
      }
    }
  }
`;

export const QueryCheckListCount = gql`
  query getCheckListCount($targetYear: Int, $targetMonth: Int) {
    checkListCount(targetYear: $targetYear, targetMonth: $targetMonth) {
      totalCount
      completedCount
      incompleteCount
    }
  }
`;

export const MutationAddCheckList = gql`
  mutation addCheckList(
    $categoryId: Int!
    $description: String!
    $reservedDate: DateTime
    $completedAt: String
    $memo: String
  ) {
    addCheckList(
      categoryId: $categoryId
      description: $description
      reservedDate: $reservedDate
      completedAt: $completedAt
      memo: $memo
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
  ) {
    updateCheckList(
      id: $id
      categoryId: $categoryId
      description: $description
      reservedDate: $reservedDate
      completedAt: $completedAt
      memo: $memo
    )
  }
`;
