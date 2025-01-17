import { CheckListStatus } from "../enum";
import { ICategory } from "./category.interface";
import { ICost } from "./cost.interface";

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

export interface IGetCheckListVariables {
  categoryId?: number;
  offset: number;
  limit: number;
}
