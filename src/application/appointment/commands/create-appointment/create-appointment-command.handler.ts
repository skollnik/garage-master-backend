import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as moment from 'moment';
import { AppointmentAlreadyTakenException } from 'src/domain/appointment/exceptions/appointment-already-taken.exception';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment.interface';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';
import { CreateAppointmentCommand } from './create-appointment.command';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';
import { ServiceType } from 'src/domain/service-type/model/service-type';

@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentCommandHandler
  implements ICommandHandler<CreateAppointmentCommand>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    firstName,
    lastName,
    car,
    serviceType,
    email,
    startDate,
    status,
    additionalInfo,
  }: CreateAppointmentCommand): Promise<Appointment> {
    const { formattedStartDate, formattedEndDate } = formatDates(
      startDate,
      serviceType,
    );
    const isAvailable = await this.appointmentRepository.checkAvailability(
      formattedStartDate,
      formattedEndDate,
    );
    if (!isAvailable) {
      throw new AppointmentAlreadyTakenException();
    }

    const appointment = Appointment.create({
      firstName,
      lastName,
      car,
      serviceType,
      email,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      status,
      additionalInfo,
    });
    const createdAppointment = this.eventPublisher.mergeObjectContext(
      await this.appointmentRepository.create(appointment),
    );

    createdAppointment.commit();
    return createdAppointment;
  }
}

const formatDates = (startDate: Date, serviceType: ServiceType) => {
  const formattedStartDate = moment(startDate, 'YYYY-MM-DD HH:mm:ss')
    .add(2, 'hour')
    .toDate();
  const endDate = new Date(formattedStartDate);
  const hours = Math.floor(serviceType.duration);
  const minutes = Math.round((serviceType.duration - hours) * 60);
  const formattedEndDate = moment(endDate, 'YYYY-MM-DD HH:mm:ss').toDate();
  formattedEndDate.setHours(formattedEndDate.getHours() + hours);
  formattedEndDate.setMinutes(formattedEndDate.getMinutes() + minutes);
  formattedEndDate.setSeconds(formattedEndDate.getSeconds() - 1);

  return { formattedStartDate, formattedEndDate };
};
