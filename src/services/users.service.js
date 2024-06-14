import { findUserById } from '../repositories/user.repository.js';

export class UserService {
  findUserById = new FindUserById();

  getProfile = async (userId) => {
    const user = await await this.findUserById;
  };
}
