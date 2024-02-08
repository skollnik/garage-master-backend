import { ServiceType } from '../model/service-type';

export interface IServiceTypeRepository {
  create(serviceType: ServiceType): Promise<ServiceType>;
  findAll(): Promise<ServiceType[]>;
}
