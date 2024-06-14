import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { UserController } from '../controllers/user.controller.js';

const usersRouter = express.Router();
const userController = new UserController();

//내정보 조회 api
usersRouter.get('/me', requireAccessToken, userController.getProfile);

export { usersRouter };
