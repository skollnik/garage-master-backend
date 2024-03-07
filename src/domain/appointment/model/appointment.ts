import { AggregateRoot } from '@nestjs/cqrs';
import { Car } from 'src/domain/appointment/model/car';
import { ServiceType } from 'src/domain/service-type/model/service-type';
import { AppointmentStatus } from '../appointment-status.enum';
import { AppointmentNotFoundException } from '../exceptions/appointment-not-found.exception';

export class Appointment extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly car: Car,
    public readonly serviceType: ServiceType,
    public readonly email: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly status: AppointmentStatus,
    public readonly additionalInfo?: string,
  ) {
    super();
  }

  static throwIfNull(appointment: Appointment) {
    if (!appointment) throw new AppointmentNotFoundException();
  }

  static create({
    id,
    firstName,
    lastName,
    car,
    serviceType,
    email,
    startDate,
    endDate,
    status,
    additionalInfo,
  }: Partial<Appointment>) {
    return new Appointment(
      id,
      firstName,
      lastName,
      car,
      serviceType,
      email,
      startDate,
      endDate,
      status,
      additionalInfo,
    );
  }
}
