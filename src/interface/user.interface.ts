import { Gender } from "../enum";

export interface IUser {
  id: number;
  email: string;
  name: string;
  birthday?: string;
  gender: Gender;
}
