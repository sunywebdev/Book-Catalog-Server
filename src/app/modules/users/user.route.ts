import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/:id',
  /*   auth(
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.USER
  ), */
  UserController.getUserById
);
router.patch('/:id', UserController.updateUser);
router.patch('/:id/wishlist', UserController.updateUserWishlist);
router.get('/:id/wishlist', UserController.allWishlist);

export const UserRoutes = router;
