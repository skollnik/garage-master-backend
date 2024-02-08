import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NewServiceTypeDto } from './dtos/new-service-type.dto';
import { CreateServiceTypeCommand } from 'src/application/service-type/commands/create-service-type/create-service-type.command';
import { ServiceTypePresenter } from './presenters/service-type.presenter';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetAllServiceTypesQuery } from 'src/application/service-type/queries/get-all-service-types/get-all-service-types.query';

@Controller('service-type')
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
}
