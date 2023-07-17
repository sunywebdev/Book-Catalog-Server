import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { CommentRoutes } from '../modules/comment/comment.route';
import { UserRoutes } from '../modules/users/user.route';

const routes = express.Router();

const moduleRotes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
];

moduleRotes.forEach(route => {
  routes.use(route.path, route.route);
});

export default routes;
