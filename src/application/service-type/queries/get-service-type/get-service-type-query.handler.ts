import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IServiceTypeRepository } from 'src/domain/service-type/interfaces/service-type.interface';
import { ServiceType } from 'src/domain/service-type/model/service-type';
import { SERVICE_TYPE_REPOSITORY } from '../../service-type.constants';
import { GetServiceTypeQuery } from './get-service-type.query';

@QueryHandler(GetServiceTypeQuery)
export class GetServiceTypeQueryHandler
  implements IQueryHandler<GetServiceTypeQuery>
{
  constructor(
    @Inject(SERVICE_TYPE_REPOSITORY)
    private readonly serviceTypeRepository: IServiceTypeRepository,
  ) {}
  async execute({ id }: GetServiceTypeQuery): Promise<any> {
    const serviceType = await this.serviceTypeRepository.findById(id);
    ServiceType.throwIfNull(serviceType);

    return serviceType;
  }
}
