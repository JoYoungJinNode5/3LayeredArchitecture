import { prisma } from '../utils/prisma.util.js';
import { HttpError } from '../errors/http.error.js';

export class ResumeService {
  createResume = async (authorId, resumeData) => {
    return await prisma.resume.create({ data: { ...resumeData, authorId } });
  };

  getResumes = async (authorId, sort = 'desc') => {
    return await prisma.resume.findMany({
      where: { authorId },
      orderBy: { createdAt: sort },
      include: { author: true },
    });
  };

  getResume = async (authorId, resumeId) => {
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId, authorId },
      include: { author: true },
    });
    if (!resume) {
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }
    return resume;
  };

  updateResume = async (authorId, resumeId, resumeData) => {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId, authorId } });
    if (!resume) {
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }

    return await prisma.resume.update({
      where: { id: resumeId, authorId },
      data: resumeData,
    });
  };

  deleteResume = async (authorId, resumeId) => {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId, authorId } });
    if (!resume) {
      throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }

    await prisma.resume.delete({ where: { id: resumeId, authorId } });
  };
}
