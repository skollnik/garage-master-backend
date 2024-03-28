import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateOrUpdateDiscountCommand } from './create-or-update-discount.command';
import { DISCOUNT_REPOSITORY } from '../../discount.constants';
import { IDiscountRepository } from 'src/domain/discount/interfaces/discout.interface';
import { Discount } from 'src/domain/discount/model/discount';

@CommandHandler(CreateOrUpdateDiscountCommand)
export class CreateOrUpdateDiscountCommandHandler
  implements ICommandHandler<CreateOrUpdateDiscountCommand>
{
  constructor(
    @Inject(DISCOUNT_REPOSITORY)
    private readonly discountRepository: IDiscountRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    text,
    isActive,
  }: CreateOrUpdateDiscountCommand): Promise<Discount> {
    const discount = Discount.create({ text, isActive });
    const createdOrUpdatedDiscount = this.eventPublisher.mergeObjectContext(
      await this.discountRepository.createOrUpdateDiscount(discount),
    );

    return createdOrUpdatedDiscount;
  }
}
