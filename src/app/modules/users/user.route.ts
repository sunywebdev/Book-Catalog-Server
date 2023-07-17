import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/get-user-by-id/:id',
  /*   auth(
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.USER
  ), */
  UserController.getUserById
);

export const UserRoutes = router;
