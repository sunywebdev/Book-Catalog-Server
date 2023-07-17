import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { IUser } from '../users/user.interface';

export const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.signUpUser(loginData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set cookies
  const cookieOptions = {
    secure: config.node_type === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    message: 'User logged in successfully',
    success: true,
    data: others,
    statusCode: httpStatus.OK,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set cookies
  const cookieOptions = {
    secure: config.node_type === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    message: 'User logged in successfully',
    success: true,
    data: result,
    statusCode: httpStatus.OK,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user || {};
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    message: 'Password changed successfully',
    success: true,
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getLoggedInUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  const result = await AuthService.getLoggedInUser(token as string);

  sendResponse<Partial<IUser>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: '',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  signUpUser,
  getLoggedInUser,
};
