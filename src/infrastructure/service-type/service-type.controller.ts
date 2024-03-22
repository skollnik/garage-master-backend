import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NewServiceTypeDto } from './dtos/new-service-type.dto';
import { CreateServiceTypeCommand } from 'src/application/service-type/commands/create-service-type/create-service-type.command';
import { ServiceTypePresenter } from './presenters/service-type.presenter';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetAllServiceTypesQuery } from 'src/application/service-type/queries/get-all-service-types/get-all-service-types.query';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { DeleteServiceTypeCommand } from 'src/application/service-type/commands/delete-service-type/delete-service-type.command';

@Controller('service-type')
@UseFilters(DomainErrorFilter)
export class ServiceTypeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll() {
    const serviceTypes = await this.queryBus.execute(
      new GetAllServiceTypesQuery(),
    );
    return serviceTypes.map(
      (serviceType) => new ServiceTypePresenter(serviceType),
    );
  }

  @UseGuards(JwtGuard)
  @Post()
  async newServiceType(@Body() { category, duration }: NewServiceTypeDto) {
    const serviceType = await this.commandBus.execute(
      new CreateServiceTypeCommand(category, duration),
    );
    return new ServiceTypePresenter(serviceType);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteServiceType(@Param('id', ParseIntPipe) id: number) {
    await this.commandBus.execute(new DeleteServiceTypeCommand(id));
    return { message: 'Service type deleted successfully' };
  }
}
