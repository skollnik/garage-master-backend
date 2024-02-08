import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateServiceTypeCommandHandler } from 'src/application/service-type/commands/create-service-type/create-service-type-command.handler';
import { GetAllServiceTypesQueryHandler } from 'src/application/service-type/queries/get-all-service-types/get-all-service-types-query.handler';
import { SERVICE_TYPE_REPOSITORY } from 'src/application/service-type/service-type.constants';
import { PrismaModule } from '../prisma/prisma.module';
import { ServiceTypeMapperFactory } from './factories/service-type-mapper.factory';
import { ServiceTypeRepository } from './repositories/service-type.repository';
import { ServiceTypeController } from './service-type.controller';

const commandHandlers: Provider[] = [CreateServiceTypeCommandHandler];

const queries: Provider[] = [GetAllServiceTypesQueryHandler];

const providers: Provider[] = [
  {
    provide: SERVICE_TYPE_REPOSITORY,
    useClass: ServiceTypeRepository,
  },
  ServiceTypeMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [ServiceTypeController],
  providers: [...commandHandlers, ...queries, ...providers],
  exports: [SERVICE_TYPE_REPOSITORY],
})
export class ServiceTypeModule {}
