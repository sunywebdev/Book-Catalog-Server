import express from 'express'
import { createComment, getCommentByProductId } from './comment.controller'

const v1CommentRoute = express.Router()

v1CommentRoute.post('/', createComment)
v1CommentRoute.get('/:id/product', getCommentByProductId)

export default v1CommentRoute
