import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser, IAuthUser } from '../../auth/current-user';

import { Purchase } from '../models/Purchase';
import { Product } from '../models/Product';

import { PurchasesService } from '../../../services/purchases.service';
import { ProductService } from '../../../services/products.service';
import { CustomersService } from '../../../services/customers.service';

import { CreatePurchaseInput } from '../inputs/create-purchase-input';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productService: ProductService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.list();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productService.findById(purchase.productId);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: IAuthUser,
  ) {
    let customer = await this.customersService.findByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customersService.create({ authUserId: user.sub });
    }

    return this.purchasesService.create({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
