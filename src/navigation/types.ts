export type RootStackParamList = {
  Login: undefined;
  AgreeToTerms: undefined;
  Signup: undefined;
  Profile: undefined;
  DefaultCategories: undefined;
  ConfirmSignup: undefined;
  EmailLogin: { setIsLoggedIn: (loggedIn: boolean) => void };
  CategoryLists: undefined;
  Home: undefined;
};

export type CategoryStackParamList = {
  CategoryHome: undefined;
  CategoryDetail: { categoryId: number };
  EditCategory: { categoryId?: number; categoryTitle?: string };
  CheckListDetail: { checkListId: number };
  EditCheckList: { checkListId?: number; isFromCategory: boolean };
};

export type CheckListStackParamList = {
  CheckListsHome: undefined;
  EditCheckList: { checkListId?: number; isFromCategory: boolean };
  CheckListDetail: { checkListId: number };
  CostDetail: { costId: number };
};

export type CalendarStackParamList = {
  CalendarHome: undefined;
  EditCheckList: { checkListId?: number; isFromCategory: boolean };
  CheckListDetail: { checkListId: number };
  EditCost: { costId?: number };
};

export type MyPageStackParamList = {
  MyPageHome: undefined;
  Invite: undefined;
  EditProfile: undefined;
};
