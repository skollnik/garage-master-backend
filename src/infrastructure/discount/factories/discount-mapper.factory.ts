import { DiscountEntity } from '@prisma/client';
import { Discount } from 'src/domain/discount/model/discount';
import { IEntityMapperFactory } from 'src/infrastructure/shared/interfaces/entity-mapper-factory.interface';

export class DiscountMapperFactory
  implements IEntityMapperFactory<DiscountEntity, Discount>
{
  fromEntity({ id, text, isActive }: DiscountEntity): Discount {
    return Discount.create({ id, text, isActive });
  }
}
