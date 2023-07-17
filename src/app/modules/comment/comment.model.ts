import { Schema, model } from 'mongoose'
import { iComment, iCommentModel } from './comment.interface'

const CommentSchema = new Schema<iComment, iCommentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Comment = model<iComment, iCommentModel>('Comment', CommentSchema)

export default Comment
