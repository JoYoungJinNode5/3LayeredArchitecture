import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { ResumeController } from '../controllers/resume.controller.js';
import { createResumeValidator } from '../middlewares/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/update-resume-validator.middleware.js';

const resumesRouter = express.Router();
const resumeController = new ResumeController();

//이력서 생성 api
resumesRouter.post('/', requireAccessToken, createResumeValidator, resumeController.createResume);

//이력서 목록조회 api
resumesRouter.get('/', requireAccessToken, resumeController.getResumes);

//이력서 상세 조회 api
resumesRouter.get('/:id', requireAccessToken, resumeController.getResume);

//이력서 수정 api
resumesRouter.put('/:id', requireAccessToken, updateResumeValidator, resumeController.updateResume);

//이력서 삭제 api
resumesRouter.delete('/:id', requireAccessToken, resumeController.deleteResume);

export { resumesRouter };
