import express from 'express';
import v1AuthRoute from '../modules/auth/auth.route';
import v1BookRoute from '../modules/book/book.route';
import v1CommentRoute from '../modules/comment/comment.route';
import v1UserRoute from '../modules/user/user.route';

const AppRouter = express.Router();

AppRouter.use('/api/v1/auth/', v1AuthRoute);
AppRouter.use('/api/v1/users/', v1UserRoute);
AppRouter.use('/api/v1/books/', v1BookRoute);
AppRouter.use('/api/v1/comments/', v1CommentRoute);

export default AppRouter;
