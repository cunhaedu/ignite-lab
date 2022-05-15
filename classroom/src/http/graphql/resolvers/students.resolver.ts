import { Resolver } from '@nestjs/graphql';
import { Student } from '../models/Student';

@Resolver(() => Student)
export class StudentsResolver {}
