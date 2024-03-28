import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrUpdateDiscountCommand } from 'src/application/discount/commands/create-or-update-discount/create-or-update-discount.command';
import { GetDiscountQuery } from 'src/application/discount/queries/get-discount/get-discount.query';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { NewOrUpdatedDiscountDto } from './dtos/new-or-updated-discount.dto';
import { DiscountPresenter } from './presenters/discount.presenter';

@Controller('discount')
@UseFilters(DomainErrorFilter)
export class DiscountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getDiscount() {
    const discount = await this.queryBus.execute(new GetDiscountQuery());
    return new DiscountPresenter(discount);
  }

  @UseGuards(JwtGuard)
  @Post()
  async newDiscount(@Body() { text, isActive }: NewOrUpdatedDiscountDto) {
    const discount = await this.commandBus.execute(
      new CreateOrUpdateDiscountCommand(text, isActive),
    );
    return new DiscountPresenter(discount);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async updateDiscount(@Body() { text, isActive }: NewOrUpdatedDiscountDto) {
    const discount = await this.commandBus.execute(
      new CreateOrUpdateDiscountCommand(text, isActive),
    );
    return new DiscountPresenter(discount);
  }
}
