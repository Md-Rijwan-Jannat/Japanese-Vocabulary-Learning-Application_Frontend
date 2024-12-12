import { TUser } from './user.type';

export interface TTutorial {
  title: string;
  createdBy: TUser;
  videoLink: string;
  description: string;
  published: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
