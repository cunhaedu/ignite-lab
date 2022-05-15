import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './Purchase';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  authUserId?: string;

  @Field(() => [Purchase])
  purchases?: Purchase[];
}
