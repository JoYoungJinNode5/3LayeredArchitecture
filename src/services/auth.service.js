import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { HttpError } from '../errors/http.error.js';

export class AuthService {
  signup = async ({ email, password, name }) => {
    const existedUser = await prisma.user.findUnique({ where: { email } });
    if (existedUser) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    return await prisma.user.create({
      data: { email, password, name },
    });
  };

  signin = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    const isPasswordMatched = user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }

    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return accessToken;
  };
}
