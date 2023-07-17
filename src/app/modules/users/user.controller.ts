import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);
  sendResponse<IUser>(res, {
    message: 'User Found',
    success: true,
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const UserController = {
  getUserById,
};
