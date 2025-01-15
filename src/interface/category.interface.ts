import { ICheckList } from "./check-list.interface";

export interface ICategory {
  id: number;
  title: string;
  budgetAmount: number;
  categoryBudgetDetails: ICategoryBudgetDetails;
  checkList: ICheckList[];
}

export interface ICategoryBudgetDetails {
  budgetAmount: number;
  remainingBudget: number;
  totalCost: number;
  paidCost: number;
  unpaidCost: number;
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

export interface IGetCategoryVariables {
  offset: number;
  limit: number;
}
