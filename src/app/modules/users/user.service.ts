import { IUser } from './user.interface';
import { User } from './user.model';

const getUserById = async (id: string): Promise<IUser | null> => {
  const users = await User.findById(id);
  return users;
};

export const UserService = {
  getUserById,
};
