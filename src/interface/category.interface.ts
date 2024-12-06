export interface ICategory {
  id: number;
  title: string;
  budgetAmount: number;
}

export interface IAddCategory {
  title: string;
  budgetAmount: number;
}

export interface IUpdateCategory {
  id: number;
  title: string;
  budgetAmount: number;
}
