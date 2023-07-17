import { IUser } from './user.interface';
import { User } from './user.model';

export const findLastUserId = async () => {
  const lastUser = await User.findOne(
    {},
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.split('-')[1] : undefined;
};

export const generateUserId = async (user: IUser) => {
  const currentUserId =
    (await findLastUserId()) || (0).toString().padStart(5, '0');
  let incrimentedId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');
  incrimentedId = user?.company
    ? `${user.company}-${incrimentedId}`
    : `user-${incrimentedId}`;
  return incrimentedId;
};
