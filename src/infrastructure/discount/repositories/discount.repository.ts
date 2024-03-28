import { IDiscountRepository } from 'src/domain/discount/interfaces/discout.interface';
import { Discount } from 'src/domain/discount/model/discount';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { DiscountMapperFactory } from '../factories/discount-mapper.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscountRepository implements IDiscountRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly discountMapperFactory: DiscountMapperFactory,
  ) {}

  async getDiscount(): Promise<Discount> {
    const discount = await this.prisma.discountEntity.findFirst();
    if (!discount) return null;

    return this.discountMapperFactory.fromEntity(discount);
  }

  async createOrUpdateDiscount({
    text,
    isActive,
  }: Discount): Promise<Discount> {
    const saved = await this.prisma.discountEntity.upsert({
      where: { id: 1 },
      update: {
        text,
        isActive,
      },
      create: {
        text,
        isActive,
      },
    });

    return this.discountMapperFactory.fromEntity(saved);
  }
}
