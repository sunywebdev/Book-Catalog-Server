import { Levels, Roles } from './user.interface';

export const roles: Roles[] = ['admin', 'user'];

export const levels: Levels[] = [1, 2, 3];

export const userRoleMaper: {
  [key: string]: number;
} = {
  admin: 1,
  user: 2,
  guest: 3,
};
