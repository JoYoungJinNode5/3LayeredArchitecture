import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { ResumeService } from '../services/resume.service.js';

export class ResumeController {
  resumeService = new ResumeService(); // resume 서비스의 클래스를 컨트롤러 클래스의 멤버 변수로 할당

  //이력서 생성
  createResume = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const authorId = req.user.id;

      const data = await this.resumeService.createResume(authorId, {
        title,
        content,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //이력서 목록 조회
  getResumes = async (req, res, next) => {
    try {
      const authorId = req.user.id;
      const { sort } = req.query;
      const data = await this.resumeService.getResumes(authorId, sort);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //이력서 상세 조회
  getResume = async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const data = await this.resumeService.getResume(authorId, id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //이력서 수정
  updateResume = async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const { title, content } = req.body;
      const data = await this.resumeService.updateResume(authorId, id, {
        title,
        content,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //이력서 삭제
  deleteResume = async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      await this.resumeService.deleteResume(authorId, id);

      return res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}
