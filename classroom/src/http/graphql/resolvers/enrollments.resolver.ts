import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';

import { StudentsService } from '../../../services/students.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { CoursesService } from '../../../services/courses.service';

import { Enrollment } from '../models/Enrollment';
import { Student } from '../models/Student';
import { Course } from '../models/Course';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.list();
  }

  @ResolveField(() => Student)
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.findById(enrollment.studentId);
  }

  @ResolveField(() => Course)
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.findById(enrollment.courseId);
  }
}
