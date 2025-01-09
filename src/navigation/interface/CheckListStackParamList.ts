export type CheckListStackParamList = {
  CheckListsHome: undefined;
  EditCheckList: { checkListId?: number; isFromCategory: boolean; categoryId?: number };
  CheckListDetail: { checkListId: number };
  EditCost: { costId?: number };
};
