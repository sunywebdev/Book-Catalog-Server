import { Date, Model, Types } from 'mongoose';

export type iBook = {
  name: string;
  author: string;
  publicationDate: Date;
  genre: string;
  summary: string;
  banner: string;
  user: Types.ObjectId;
};

export type iBookModel = Model<iBook>;
