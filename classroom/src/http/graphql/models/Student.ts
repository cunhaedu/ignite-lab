import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './Enrollment';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "authUserId")')
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external')
  authUserId: string;

  @Field(() => [Enrollment])
  enrollments?: Enrollment[];
}
