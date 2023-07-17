import express from 'express'
import { createComment, getCommentByProductId } from './comment.controller'

const router = express.Router();

router.post('/', createComment)
router.get('/:id/product', getCommentByProductId)

export const CommentRoutes = router;
