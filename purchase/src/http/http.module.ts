import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';

import { ProductResolver } from './graphql/resolvers/products.resolver';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';

import { ProductService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { CustomersService } from '../services/customers.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gpl'),
    }),
  ],
  providers: [
    // Resolvers
    ProductResolver,
    PurchasesResolver,
    CustomersResolver,

    // Services
    ProductService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
