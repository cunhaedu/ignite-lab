import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
import { EnrollmentsService } from '../../services/enrollments.service';

interface Customer {
  authUserId: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
}

interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.findByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.findBySlug(payload.product.slug);

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }

    const isEnrollmentExists =
      await this.enrollmentsService.findByCourseAndStudentId({
        courseId: course.id,
        studentId: student.id,
      });

    if (isEnrollmentExists) {
      return;
    }

    await this.enrollmentsService.create({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
