import { prisma } from '../utils/prisma.util.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

export class UserRepository {
  createUser = async (userData) => {
    try {
      return await prisma.user.create({ data: userData });
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };

  findUserByEmail = async (email) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
      }
      return user;
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };

  findUserById = async (id) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
      }
      return user;
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };
}
