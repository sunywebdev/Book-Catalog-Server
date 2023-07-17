import { Schema, model } from 'mongoose'
import { iBook, iBookModel } from './book.interface'

const bookSchema = new Schema<iBook, iBookModel>(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    publicationDate: {
      type: Date,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    summery: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Book = model<iBook, iBookModel>('Book', bookSchema)

export default Book
