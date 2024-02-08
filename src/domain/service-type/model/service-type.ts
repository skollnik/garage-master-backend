import { AggregateRoot } from '@nestjs/cqrs';

export class ServiceType extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly category: string,
    public readonly duration: number,
  ) {
    super();
  }

  static create({ id, category, duration }: Partial<ServiceType>) {
    return new ServiceType(id, category, duration);
  }
}
