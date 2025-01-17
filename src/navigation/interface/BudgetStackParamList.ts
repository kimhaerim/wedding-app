export type BudgetStackParamList = {
  BudgetHome: undefined;
  CategoryDetail: { categoryId: number };
  CheckListDetail: { checkListId: number };
  EditCategory: { categoryId?: number; categoryTitle?: string; fromNavigator: string };
  EditCheckList: { checkListId?: number; isFromCategory: boolean; categoryId: number; fromNavigator: string };
  EditCost: { costId?: number; checkListId?: number; fromNavigator: string; isFromCheckList: boolean };
};
