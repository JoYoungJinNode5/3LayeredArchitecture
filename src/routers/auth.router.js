import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { signUpValidator } from '../middlewares/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/sign-in-validator.middleware.js';

const authRouter = express.Router();
const authController = new AuthController();

//회원가입 api
authRouter.post('/signup', signUpValidator, authController.signup);

//로그인 api
authRouter.post('/signin', signInValidator, authController.signin);

export { authRouter };
