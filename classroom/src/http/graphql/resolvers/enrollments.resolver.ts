import { Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/Enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {}
