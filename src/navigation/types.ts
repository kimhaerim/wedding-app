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
  EditCategory: { categoryId?: number; categoryTitle?: string };
  EditCheckList: { checkListId?: number; isFromCategory: boolean };
};

export type CheckListStackParamList = {
  CheckLists: undefined;
  EditCheckList: { checkListId?: number; isFromCategory: boolean };
};
