import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';

const authRouter = express.Router();
const authController = new AuthController();

//회원가입 api
authRouter.post('/signup', signUpValidator, authController.signup);

//로그인 api
authRouter.post('/signin', signInValidator, authController.signin);

export { authRouter };
