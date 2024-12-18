import { CheckListStatus, CostType } from "../enum";

export interface ICheckList {
  id: number;
  description: string;
  reservedDate?: Date;
  isCompleted: boolean;
  memo?: string;
  status?: CheckListStatus;
  costs: ICost[];
}

export interface ICost {
  title: string;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
