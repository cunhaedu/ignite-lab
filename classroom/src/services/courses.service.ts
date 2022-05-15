import { Injectable } from '@nestjs/common';

import { Course } from '../http/graphql/models/Course';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

interface ICreateCourseData {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findById(id: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { slug },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: ICreateCourseData): Promise<Course> {
    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error('Course already exists!');
    }

    return this.prisma.course.create({ data: { title, slug } });
  }
}
