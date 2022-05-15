import { Injectable } from '@nestjs/common';
import { Purchase } from '@prisma/client';
import { KafkaService } from '../messaging/kafka.service';

import { PrismaService } from '../database/prisma/prisma.service';

interface ICreatePurchaseData {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

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

    const purchase = await this.prisma.purchase.create({
      data: { customerId, productId },
    });

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
