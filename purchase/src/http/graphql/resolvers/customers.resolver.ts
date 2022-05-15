import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../../auth/current-user';
import { Customer } from '../models/Customer';
import { Purchase } from '../models/Purchase';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  async me(@CurrentUser() user: IAuthUser) {
    const customer = await this.customersService.findByAuthUserId(user.sub);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }

  @ResolveField(() => [Purchase])
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.findByCustomerId(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.findByAuthUserId(reference.authUserId);
  }
}
