import { AggregateRoot } from '@nestjs/cqrs';
import { Car } from 'src/domain/appointment/model/car';
import { ServiceType } from 'src/domain/service-type/model/service-type';

export class Appointment extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly car: Car,
    public readonly serviceType: ServiceType,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly additionalInfo?: string,
  ) {
    super();
  }

  static create({
    id,
    firstName,
    lastName,
    car,
    serviceType,
    startDate,
    endDate,
    additionalInfo,
  }: Partial<Appointment>) {
    return new Appointment(
      id,
      firstName,
      lastName,
      car,
      serviceType,
      startDate,
      endDate,
      additionalInfo,
    );
  }
}
