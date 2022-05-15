import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { Customer } from '../http/graphql/models/Customer';

interface ICreateCustomerData {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findByAuthUserId(authUserId: string): Promise<Customer> {
    return this.prisma.customer.findUnique({ where: { authUserId } });
  }

  async create({ authUserId }: ICreateCustomerData): Promise<Customer> {
    const customerWithSameAuthUserId = await this.prisma.customer.findUnique({
      where: { authUserId },
    });

    if (customerWithSameAuthUserId) {
      throw new Error(
        'Another customer with same auth user ID already exists!',
      );
    }

    return this.prisma.customer.create({
      data: { authUserId },
    });
  }
}
