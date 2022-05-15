import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';
import { Product } from '../http/graphql/models/Product';

interface ICreateProduct {
  title: string;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async create({ title }: ICreateProduct): Promise<Product> {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists!');
    }

    return this.prisma.product.create({
      data: { title, slug },
    });
  }
}
