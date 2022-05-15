import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { ProductService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';

import { Product } from '../models/Product';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  products() {
    return this.productService.list();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.create(data);
  }
}
