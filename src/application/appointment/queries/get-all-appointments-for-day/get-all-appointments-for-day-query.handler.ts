import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAppointmentsForDayQuery } from './get-all-appointments-for-day.query';
import { Inject } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment.interface';

@QueryHandler(GetAppointmentsForDayQuery)
export class GetAppointmentsForDayQueryHandler
  implements IQueryHandler<GetAppointmentsForDayQuery>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute({ date }: GetAppointmentsForDayQuery): Promise<any> {
    const appointments =
      await this.appointmentRepository.getAppointmentsForDay(date);
    return appointments;
  }
}
