import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../../auth/current-user';

import { StudentsService } from '../../../services/students.service';
import { EnrollmentsService } from '../../../services/enrollments.service';

import { Student } from '../models/Student';
import { Enrollment } from '../models/Enrollment';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: IAuthUser) {
    const student = await this.studentsService.findByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.list();
  }

  @ResolveField(() => [Enrollment])
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.findByStudentId(student.id);
  }
}
