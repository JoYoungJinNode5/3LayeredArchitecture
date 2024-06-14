import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { UserService } from '../services/user.service.js';

export class UserController {
  userService = new UserService(); // user 서비스의 클래스를 컨트롤러 클래스의 멤버 변수로 할당
  getProfile = async (req, res, next) => {
    try {
      const data = req.user;

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
