import { CostType } from "../enum";

export interface IAddCost {
  title: string;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}

export interface ICostByCheckList {
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
}
