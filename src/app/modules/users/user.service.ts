import ApiError from '../../../errors/ApiError';
import { userRoleMaper } from './user.constant';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
import httpStatus from 'http-status';
import { Ifilters, IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // generate user id
  const id = await generateUserId(user);
  user.id = id;

  // default password
  if (!user.password) user.password = '123456';

  // check role and level is a match
  if (userRoleMaper[user.role] !== user.level)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role and level is not a match');

  const newUser = await User.create(user);
  if (!newUser) throw new ApiError(400, 'Cannot create user');
  return newUser;
};

const getAllUsers = async (
  filters: Ifilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const searchAbleFields = ['id', 'name', 'email', 'role'];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchAbleFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const users = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(Number(limit));
  const total = await User.countDocuments();
  return {
    meta: {
      page,
      limit,
      found: users.length,
      total,
    },
    data: users,
  };
};

const getUserById = async (id: string): Promise<IUser | null> => {
  const users = await User.findById(id);
  return users;
};

const updateUser = async (
  id: string,
  user: Partial<IUser>
): Promise<IUser | null> => {
  if (user.role && user.level && userRoleMaper[user.role] !== user.level)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role and level is not a match');
  const update = await User.findOneAndUpdate({ _id: id }, user, { new: true });
  return update;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
