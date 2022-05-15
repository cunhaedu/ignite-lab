import { Injectable } from '@nestjs/common';

import { Student } from '../http/graphql/models/Student';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }

  async findById(id: string): Promise<Student> {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  async findByAuthUserId(authUserId: string): Promise<Student> {
    return this.prisma.student.findUnique({ where: { authUserId } });
  }
}
