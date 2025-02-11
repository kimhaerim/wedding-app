import { CostType } from "../enum";

export interface IAddCost {
  title: string;
  amount: number;
  checkListId: number;
  categoryId?: number;
  paymentDate?: string;
  memo?: string;
  costType: CostType;
  isIncludeBudget: boolean;
}

export interface IUpdateCost {
  id: number;
  title?: string;
  amount?: number;
  checkListId: number;
  categoryId?: number;
  paymentDate?: string;
  memo?: string;
  costType?: CostType;
  isIncludeBudget?: boolean;
}

export interface ICostByCheckList {
  totalCost: number;
  paidCost: number;
  unpaidCost: number;
}

export interface ICostsByCategoryId {
  categoryId: number;
  costs: ICostByCheckList;
}

export interface ICost {
  id: number;
  title: string;
  amount: number;
  paymentDate?: string;
  memo?: string;
  costType: CostType;
  isIncludeBudget: boolean;
}
