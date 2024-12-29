import { CheckListStatus, CostType } from "../enum";
import { ICategory } from "./category.interface";

export interface ICheckList {
  id: number;
  description: string;
  reservedDate?: Date;
  isCompleted: boolean;
  memo?: string;
  status?: CheckListStatus;
  costs: ICost[];
  category?: ICategory;
}

export interface ICheckListTemp {
  id: number;
  description: string;
  reservedDate?: string;
  reservedTime?: string;
  isCompleted: boolean;
  memo?: string;
  status?: CheckListStatus;
  category?: ICategory;
}

export interface ICost {
  id: number;
  title: string;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
