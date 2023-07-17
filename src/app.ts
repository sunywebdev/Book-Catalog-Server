import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from './shared/sendResponse';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

//handle global error
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, {
    message: 'API Not Found',
    success: false,
    data: {
      url: req.originalUrl,
      method: req.method,
    },
    statusCode: httpStatus.NOT_FOUND,
  });
  next();
});

export default app;
