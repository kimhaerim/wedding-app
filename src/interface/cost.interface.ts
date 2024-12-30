import { CostType } from "../enum";

export interface IAddCost {
  title: string;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
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
