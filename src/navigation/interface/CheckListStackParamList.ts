export type CheckListStackParamList = {
  CheckListsHome: undefined;
  EditCheckList: { checkListId?: number; isFromCategory: boolean; categoryId?: number; fromNavigator: string };
  CheckListDetail: { checkListId: number };
  EditCost: { costId?: number; checkListId?: number; fromNavigator: string; isFromCheckList: boolean };
};
