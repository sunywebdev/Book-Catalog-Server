import { iComment } from './comment.interface'
import { default as Comment } from './comment.model'

export const createCommentDB = async (data: iComment): Promise<iComment> => {
  const result = await Comment.create(data)

  return result
}

export const getCommentByProductIdDB = async (id: string): Promise<iComment[] | null> => {
  const result = await Comment.find({ book: id })

  return result
}
