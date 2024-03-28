import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { DiscountController } from './discount.controller';
import { CreateOrUpdateDiscountCommandHandler } from 'src/application/discount/commands/create-or-update-discount/create-or-update-discount-command.handler';
import { GetDiscountQueryHandler } from 'src/application/discount/queries/get-discount/get-discount-query.handler';
import { DISCOUNT_REPOSITORY } from 'src/application/discount/discount.constants';
import { DiscountRepository } from './repositories/discount.repository';
import { DiscountMapperFactory } from './factories/discount-mapper.factory';

const commandHandlers: Provider[] = [CreateOrUpdateDiscountCommandHandler];

const queries: Provider[] = [GetDiscountQueryHandler];

const providers: Provider[] = [
  {
    provide: DISCOUNT_REPOSITORY,
    useClass: DiscountRepository,
  },
  DiscountMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [DiscountController],
  providers: [...commandHandlers, ...queries, ...providers],
  exports: [DISCOUNT_REPOSITORY],
})
export class DiscountModule {}
