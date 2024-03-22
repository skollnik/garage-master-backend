import { ServiceType } from '../model/service-type';

export interface IServiceTypeRepository {
  create(serviceType: ServiceType): Promise<ServiceType>;
  findAll(): Promise<ServiceType[]>;
  findById(id: number): Promise<ServiceType>;
  delete(id: number): Promise<void>;
}
