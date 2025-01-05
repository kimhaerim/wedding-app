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
      cost {
        amount
      }
    }
  }
`;
