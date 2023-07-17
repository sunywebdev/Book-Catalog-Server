import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
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
];

moduleRotes.forEach(route => {
  routes.use(route.path, route.route);
});

export default routes;
