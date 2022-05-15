import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CoursesService } from '../../../services/courses.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/Course';
import { CurrentUser, IAuthUser } from 'src/http/auth/current-user';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.list();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: IAuthUser) {
    const student = await this.studentsService.findByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found!');
    }

    const course = await this.coursesService.findById(id);

    if (!course) {
      throw new Error('Course not found');
    }

    const enrollment = await this.enrollmentsService.findByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return course;
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
