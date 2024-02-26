import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IServiceTypeRepository } from 'src/domain/service-type/interfaces/service-type.interface';
import { SERVICE_TYPE_REPOSITORY } from '../../service-type.constants';
import { GetAllServiceTypesQuery } from './get-all-service-types.query';
import { ServiceType } from 'src/domain/service-type/model/service-type';

@QueryHandler(GetAllServiceTypesQuery)
export class GetAllServiceTypesQueryHandler
  implements IQueryHandler<GetAllServiceTypesQuery>
{
  constructor(
    @Inject(SERVICE_TYPE_REPOSITORY)
    private readonly serviceTypeRepository: IServiceTypeRepository,
  ) {}

  async execute(): Promise<ServiceType[]> {
    const serviceTypes = await this.serviceTypeRepository.findAll();
    return serviceTypes;
  }
}
