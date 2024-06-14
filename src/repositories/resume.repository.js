import { prisma } from '../utils/prisma.util.js';
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumeRepository {
  createResume = async (userId, resumeData) => {
    try {
      return await prisma.resume.create({ data: { ...resumeData, authorId: userId } });
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };

  getResumes = async (userId) => {
    try {
      const resumes = await prisma.resume.findMany({ where: { authorId: userId } });
      if (resumes.length === 0) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }
      return resumes;
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };

  getResume = async (userId, resumeId) => {
    try {
      const resume = await prisma.resume.findUnique({ where: { id: resumeId, authorId: userId } });
      if (!resume) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }
      return resume;
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };

  updateResume = async (userId, resumeId, resumeData) => {
    try {
      const resume = await prisma.resume.findUnique({ where: { id: resumeId, authorId: userId } });
      if (!resume) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }
      return await prisma.resume.update({
        where: { id: resumeId, authorId: userId },
        data: resumeData,
      });
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };

  deleteResume = async (userId, resumeId) => {
    try {
      const resume = await prisma.resume.findUnique({ where: { id: resumeId, authorId: userId } });
      if (!resume) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }
      return await prisma.resume.delete({ where: { id: resumeId, authorId: userId } });
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  };
}
