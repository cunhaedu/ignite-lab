import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './Enrollment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  authUserId: string;

  @Field(() => [Enrollment])
  enrollments?: Enrollment[];
}
