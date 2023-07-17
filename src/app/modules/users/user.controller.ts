import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constants/constants';
import { IUser } from './user.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);
  sendResponse(res, {
    message: 'User created successfully',
    success: true,
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'id',
    'name',
    'email',
    'role',
  ]);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, paginationOptions);
  sendResponse<IUser[]>(res, {
    message: 'Users fetched successfully',
    success: true,
    meta: result.meta,
    data: result ? result.data : [],
    statusCode: httpStatus.OK,
  });
});

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
  const { id } = req.params;
  const user = req.body;
  const result = await UserService.updateUser(id, user);
  sendResponse<IUser>(res, {
    message: 'User updated successfully',
    success: true,
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    message: 'User deleted successfully',
    success: true,
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
