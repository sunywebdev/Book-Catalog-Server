import { Model, Types } from 'mongoose'

export type iComment = {
  user: Types.ObjectId
  book: Types.ObjectId
  comment: string
}

export type iCommentModel = Model<iComment>
