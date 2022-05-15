import { Injectable } from '@nestjs/common';
import { Enrollment } from '../http/graphql/models/Enrollment';
import { PrismaService } from '../database/prisma/prisma.service';

interface IFindByCourseAndStudentData {
  studentId: string;
  courseId: string;
}

interface ICreateEnrollmentData {
  studentId: string;
  courseId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create({
    studentId,
    courseId,
  }: ICreateEnrollmentData): Promise<Enrollment> {
    return this.prisma.enrollment.create({
      data: { courseId, studentId },
    });
  }

  findByCourseAndStudentId({
    courseId,
    studentId,
  }: IFindByCourseAndStudentData): Promise<Enrollment> {
    return this.prisma.enrollment.findFirst({
      where: { studentId, courseId, canceledAt: null },
    });
  }

  async findByStudentId(studentId: string): Promise<Enrollment[]> {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
