import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { iComment } from './comment.interface';
import { createCommentDB, getCommentByProductIdDB } from './comment.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

export const createComment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createCommentDB(req.body);

    sendResponse<iComment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment created successfully',
      data: result,
    });
  }
);

export const getCommentByProductId: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getCommentByProductIdDB(req.params.id);

    sendResponse<iComment[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment retrieved successfully',
      data: result,
    });
  }
);
