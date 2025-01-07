import { Gender } from "../enum";

export interface IUser {
  id: number;
  email: string;
  name: string;
  birthday?: string;
  gender: Gender;
  partner?: IUser;
}

export interface ISignup {
  email: string;
  password: string;
  name: string;
  birthday?: string;
  gender: Gender;
  coupleId?: number;
  weddingDate?: Date;
  coupleStartDate?: string;
}
