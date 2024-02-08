import { ServiceTypeEntity } from '@prisma/client';
import { ServiceType } from 'src/domain/service-type/model/service-type';
import { IEntityMapperFactory } from 'src/infrastructure/shared/interfaces/entity-mapper-factory.interface';

export class ServiceTypeMapperFactory
  implements IEntityMapperFactory<ServiceTypeEntity, ServiceType>
{
  fromEntity({ id, category, duration }: ServiceTypeEntity): ServiceType {
    return ServiceType.create({ id, category, duration });
  }
}
