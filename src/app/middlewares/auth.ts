import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtHelper } from '../../helpers/jwt';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
      }
      let verifiedUser = null;
      verifiedUser = JwtHelper.verifyToken(token, config.jwt.secret as Secret);
      req.user = verifiedUser;
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
