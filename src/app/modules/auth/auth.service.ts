import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.interface';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtHelper } from '../../../helpers/jwt';
import { IChangePassword } from '../../../interfaces/common';
import bcrypt from 'bcrypt';
import { IUser } from '../users/user.interface';

export const signUpUser = async (data: ILoginUser) => {
  const result = await User.create(data);
  const { ...other } = result.toObject();
  return other;
};

const loginUser = async (loginData: ILoginUser) => {
  const { email, password } = loginData;
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordMatch =
    isUserExist.password &&
    (await User.isPasswordMatch(password, isUserExist.password));

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { email: userEmail } = isUserExist;
  const accessToken = JwtHelper.createToken(
    {
      userEmail,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  const refreshToken = JwtHelper.createToken(
    {
      userEmail,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  let verifiedToken;
  try {
    verifiedToken = JwtHelper.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { userEmail } = verifiedToken;
  const isUserExist = await User.isUserExist(userEmail as string);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const newAccessToken = JwtHelper.createToken(
    {
      email: isUserExist.email,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const isUserExist = await User.isUserExist(user?.email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isPasswordMatch =
    isUserExist.password &&
    (await User.isPasswordMatch(oldPassword, isUserExist.password));

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    { email: user?.email },
    {
      password: newHashedPassword,
    }
  );
};

const getLoggedInUser = async (
  token: string
): Promise<Partial<IUser> | null> => {
  try {
    const verifyUser = jwt.verify(
      token,
      config.jwt.secret as string
    ) as JwtPayload;
    return await User.findOne({ email: verifyUser?.userEmail }).select({
      email: 1,
    });
  } catch (error) {
    return null;
  }
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  signUpUser,
  getLoggedInUser,
};
