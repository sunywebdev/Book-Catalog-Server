/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

type iReading = {
  book: Types.ObjectId;
  stage: 'Reading' | 'Reading Soon' | 'Finished';
};

export type IUser = {
  email: string;
  password: string;
  wishlist: Types.ObjectId[];
  reading: iReading[];
};

export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
