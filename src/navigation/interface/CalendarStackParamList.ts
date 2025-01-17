export type CalendarStackParamList = {
  CalendarHome: undefined;
  CheckListDetail: { checkListId: number };
  EditCheckList: {
    checkListId?: number;
    isFromCategory: boolean;
    categoryId?: number;
    fromNavigator: string;
    reservedAt: string;
  };
  EditCost: { costId?: number; checkListId?: number; fromNavigator: string; isFromCheckList: boolean };
};
