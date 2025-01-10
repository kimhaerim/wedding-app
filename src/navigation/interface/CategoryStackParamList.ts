export type CategoryStackParamList = {
  CategoryHome: undefined;
  CategoryDetail: { categoryId: number };
  EditCategory: { categoryId?: number; categoryTitle?: string };
  CheckListDetail: { checkListId: number };
  EditCheckList: { checkListId?: number; isFromCategory: boolean; categoryId: number };
};
