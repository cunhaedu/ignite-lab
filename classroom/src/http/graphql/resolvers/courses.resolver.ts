import { Resolver } from '@nestjs/graphql';

import { Course } from '../models/Course';

@Resolver(() => Course)
export class CoursesResolver {}
