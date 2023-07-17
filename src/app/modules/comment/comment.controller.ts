import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import apiResponse from '../../../shared/api_response'
import catchAsync from '../../../shared/catch_async'
import { iComment } from './comment.interface'
import { createCommentDB, getCommentByProductIdDB } from './comment.service'

export const createComment: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await createCommentDB(req.body)

  apiResponse<iComment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment created successfully',
    data: result
  })
})

export const getCommentByProductId: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await getCommentByProductIdDB(req.params.id)

  apiResponse<iComment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment retrieved successfully',
    data: result
  })
})
