import { prisma } from '../utils/prisma.util.js';
import { HttpError } from '../errors/http.error.js';

export class UserService {
  getProfile = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
    }
    return user;
  };
}
