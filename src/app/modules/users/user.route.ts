import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.CreateUserZodSchema),
  UserController.createUser
);

router.get(
  '/get-all-users',
  auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  UserController.getAllUsers
);
router.patch(
  '/update-user-by-id/:id',
  auth(
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.USER
  ),
  validateRequest(UserValidation.UpdateUserZodSchema),
  UserController.updateUser
);
router.delete(
  '/delete-user-by-id/:id',
  auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.SUPER_ADMIN),
  UserController.deleteUser
);
router.get(
  '/get-user-by-id/:id',
  auth(
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.USER
  ),
  UserController.getUserById
);

export const UserRoutes = router;
