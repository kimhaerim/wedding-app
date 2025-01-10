import { CheckListStatus, CostType } from "../enum";
import { ICategory } from "./category.interface";

export interface IAddCheckList {
  categoryId?: number;
  description: string;
  reservedDate?: Date;
  completedAt?: string;
  memo?: string;
  status?: CheckListStatus;
}

export interface IUpdateCheckList {
  id: number;
  categoryId?: number;
  description?: string;
  reservedDate?: Date;
  completedAt?: string;
  memo?: string;
  status?: CheckListStatus;
}

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

export interface ICost {
  id: number;
  title: string;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
