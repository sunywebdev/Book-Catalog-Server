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
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUser(req.params.id, req.body);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});
const updateUserWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUserWishlist(req.params.id, req.body);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const allWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.allWishlist(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books found successfully',
    data: result,
  });
});

export const UserController = {
  getUserById,
  updateUser,
  updateUserWishlist,
  allWishlist,
};
