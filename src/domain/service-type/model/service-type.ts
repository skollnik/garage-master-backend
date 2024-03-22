import { AggregateRoot } from '@nestjs/cqrs';
import { ServiceTypeNotFoundException } from '../exceptions/service-type-not-found.exception';

export class ServiceType extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly category: string,
    public readonly duration: number,
  ) {
    super();
  }

  static throwIfNull(serviceType: ServiceType) {
    if (!serviceType) throw new ServiceTypeNotFoundException();
  }

  static create({ id, category, duration }: Partial<ServiceType>) {
    return new ServiceType(id, category, duration);
  }
}
