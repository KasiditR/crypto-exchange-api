import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorObject } from './../error/ErrorObject';
import { envVar } from '../configs/envVar';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationToken = req.headers['authorization'];
  if (authorizationToken === '') {
    return next(new ErrorObject('Authorization token is missing', 403));
  }

  if (authorizationToken?.startsWith('Bearer ') === false) {
    return next(new ErrorObject('Invalid token format', 400));
  }

  const token = authorizationToken?.replace('Bearer ', '');

  jwt.verify(token as string, envVar.accessTokenSecret as string, async (err, user) => {
    if (err) {
      return next(new ErrorObject('AUTH_ERROR', 403));
    }

    req.user = user;
    next();
  });
};

export const generateToken = (user: any) => {
  return jwt.sign(user, envVar.accessTokenSecret as string, {
    expiresIn: '1h',
  });
};
