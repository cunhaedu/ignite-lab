import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { MessagingModule } from '../messaging/messaging.module';

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
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
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
