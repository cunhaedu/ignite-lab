import { Module } from '@nestjs/common';
import { PurchaseController } from './controllers/purcahse.controller';

import { CoursesService } from '../services/courses.service';
import { StudentsService } from '../services/students.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [CoursesService, StudentsService, EnrollmentsService],
})
export class MessagingModule {}
