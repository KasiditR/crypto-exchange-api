import { NextFunction, Request, Response } from 'express';
import { ErrorObject } from '../error/ErrorObject';
import { HashPassword, VerifyPassword } from '../utils/password';
import { generateToken } from '../middleware/jwt.auth';
import User from '../models/User';

const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      throw new ErrorObject('invalid body', 400);
    }

    const exitsUsername = await User.findOne({ where: { username: username } });
    if (exitsUsername) {
      throw new ErrorObject('username already exits', 400);
    }
    const hashPassword = await HashPassword(password);
    const user = await User.create<User>({
      user_id: crypto.randomUUID().replace(/-/g, ''),
      username: username,
      password: hashPassword,
    });

    user.save();

    res.status(201).json({
      user_id: user.user_id,
      username: username,
    });
  } catch (error: any) {
    next(error);
  }
};

const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ErrorObject('invalid body', 400);
    }

    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      throw new ErrorObject("user doesn't exits", 400);
    }

    const isPasswordCorrect = await VerifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new ErrorObject('password mismatch', 400);
    }

    const userResponse = {
      user_id: user.user_id,
      username: user.username,
    };

    const accessToken = generateToken(userResponse);

    res.status(200).json({
      accessToken,
      user: userResponse,
    });
  } catch (error: any) {
    next(error);
  }
};

export default {
  Register,
  Login,
};
