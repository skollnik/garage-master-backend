import {
  AppointmentEntity,
  CarEntity,
  ServiceTypeEntity,
} from '@prisma/client';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { Car } from 'src/domain/appointment/model/car';
import { ServiceType } from 'src/domain/service-type/model/service-type';
import { IEntityMapperFactory } from 'src/infrastructure/shared/interfaces/entity-mapper-factory.interface';

export class AppointmentMapperFactory
  implements IEntityMapperFactory<AppointmentEntity, Appointment>
{
  appointmentStatus = {
    PENDING: AppointmentStatus.PENDING,
    CONFIRMED: AppointmentStatus.CONFIRMED,
    CANCELED: AppointmentStatus.CANCELED,
  };

  fromEntity({
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
  }: AppointmentEntity & {
    serviceType?: ServiceTypeEntity;
  } & { car?: CarEntity }): Appointment {
    const carMapped = car
      ? Car.create({
          id: car.id,
          model: car.model,
        })
      : null;
    const serviceTypeMapped = serviceType
      ? ServiceType.create({
          id: serviceType.id,
          category: serviceType.category,
          duration: serviceType.duration,
        })
      : null;

    return Appointment.create({
      id,
      firstName,
      lastName,
      car: carMapped,
      serviceType: serviceTypeMapped,
      email,
      startDate,
      endDate,
      status: this.appointmentStatus[status],
      additionalInfo,
    });
  }
}
