import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Car } from 'src/domain/appointment/model/car';
import { ServiceType } from 'src/domain/service-type/model/service-type';

export class NewAppointmentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  car: Car;

  @IsNotEmpty()
  serviceType: ServiceType;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsString()
  additionalInfo?: string;

  @IsNotEmpty()
  @IsBoolean()
  authorized: boolean;
}
