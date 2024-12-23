import { CostType } from "../enum";

export interface IAddCost {
  title: string;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
