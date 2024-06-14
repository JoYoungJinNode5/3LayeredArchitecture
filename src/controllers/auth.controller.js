import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';

export class AuthController {
  authService = new AuthService(); // auth 서비스의 클래스를 컨트롤러 클래스의 멤버 변수로 할당

  signup = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

      const data = await this.authService.signup({
        email,
        password: hashedPassword,
        name,
      });

      data.password = undefined;

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const accessToken = await this.authService.signin(email, password);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  };
}
