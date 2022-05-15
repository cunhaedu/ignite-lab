import { Injectable } from '@nestjs/common';
import { Purchase } from '@prisma/client';

import { PrismaService } from '../database/prisma/prisma.service';

interface ICreatePurchaseData {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCustomerId(customerId: string): Promise<Purchase[]> {
    return this.prisma.purchase.findMany({
      where: { customerId },
    });
  }

  async create({
    productId,
    customerId,
  }: ICreatePurchaseData): Promise<Purchase> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found!');
    }

    return this.prisma.purchase.create({
      data: { customerId, productId },
    });
  }
}
