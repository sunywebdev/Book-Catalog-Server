import { IUser } from './user.interface';
import { User } from './user.model';

const getUserById = async (id: string): Promise<IUser | null> => {
  const users = await User.findById(id);
  return users;
};

const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });

  return result;
};

const updateUserWishlist = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(
    id,
    { $push: { wishlist: data.wishlist } },
    { runValidators: true, new: true }
  );

  return result;
};
export const UserService = {
  getUserById,
  updateUser,
  updateUserWishlist,
};
