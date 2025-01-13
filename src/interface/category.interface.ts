import { ICheckList } from "./check-list.interface";

export interface ICategory {
  id: number;
  title: string;
  budgetAmount: number;
  checkList: ICheckList[];
}

export interface IAddCategory {
  title: string;
  budgetAmount: number;
}

export interface IUpdateCategory {
  id: number;
  title?: string;
  budgetAmount?: number;
}

export interface ICategoryBudgetAmount {
  totalBudgetAmount: number;
  paidBudgetAmount: number;
  unpaidBudgetAmount: number;
}

export interface IGetCategoryVariables {
  offset: number;
  limit: number;
}
