import { Car } from 'src/domain/appointment/model/car';
import { ServiceType } from 'src/domain/service-type/model/service-type';

export class AppointmentPresenter {
  public readonly id: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly car: Car;
  public readonly serviceType: ServiceType;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly additionalInfo?: string;

  constructor({
    id,
    firstName,
    lastName,
    car,
    serviceType,
    startDate,
    endDate,
    additionalInfo,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.car = car;
    this.serviceType = serviceType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.additionalInfo = additionalInfo;
  }
}
