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

export interface ICheckListTemp {
  id: number;
  description: string;
  reservedDate?: string;
  reservedTime?: string;
  isCompleted: boolean;
  memo?: string;
  status?: CheckListStatus;
}

export interface ICost {
  id: number;
  title: string;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
