import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IDiscountRepository } from 'src/domain/discount/interfaces/discout.interface';
import { DISCOUNT_REPOSITORY } from '../../discount.constants';
import { GetDiscountQuery } from './get-discount.query';
import { DiscountNotFoundException } from 'src/domain/discount/exceptions/discount-not-found.exception';

@QueryHandler(GetDiscountQuery)
export class GetDiscountQueryHandler
  implements IQueryHandler<GetDiscountQuery>
{
  constructor(
    @Inject(DISCOUNT_REPOSITORY)
    private readonly discountRepository: IDiscountRepository,
  ) {}
  async execute(): Promise<any> {
    const discount = await this.discountRepository.getDiscount();

    if (!discount) throw new DiscountNotFoundException();

    return discount;
  }
}
