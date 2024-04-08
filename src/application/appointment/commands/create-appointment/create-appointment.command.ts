import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';
import { Car } from 'src/domain/appointment/model/car';
import { ServiceType } from 'src/domain/service-type/model/service-type';

export class CreateAppointmentCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly car: Car,
    public readonly serviceType: ServiceType,
    public readonly email: string,
    public readonly startDate: string,
    public readonly status: AppointmentStatus,
    public readonly additionalInfo?: string,
  ) {}
}
