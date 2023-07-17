/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type Roles = 'admin' | 'user' | 'guest';
export type Levels = 1 | 2 | 3;

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Roles;
  level: Levels;
  company?: string;
  needChangePassword: true | false;
  passwordChangedAt?: Date;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'password' | 'needChangePassword' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
