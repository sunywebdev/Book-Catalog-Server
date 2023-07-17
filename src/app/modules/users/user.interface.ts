/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type Roles = 'admin' | 'user' | 'guest';
export type Levels = 1 | 2 | 3;

export type IUser = {
  email: string;
  password: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
