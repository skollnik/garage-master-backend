import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NewAppointmentDto } from './dtos/new-appointment.dto';
import { CreateAppointmentCommand } from 'src/application/appointment/commands/create-appointment/create-appointment.command';
import { AppointmentPresenter } from './presenters/appointment.presenter';
import { AppointmentsForDayDto } from './dtos/appointments-for-day.dto';
import { GetAppointmentsForDayQuery } from 'src/application/appointment/queries/get-all-appointments-for-day/get-all-appointments-for-day.query';

@Controller('appointment')
@UseFilters(DomainErrorFilter)
export class AppointmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async newAppointment(
    @Body()
    {
      firstName,
      lastName,
      car,
      serviceType,
      startDate,
      additionalInfo,
    }: NewAppointmentDto,
  ) {
    const appointment = await this.commandBus.execute(
      new CreateAppointmentCommand(
        firstName,
        lastName,
        car,
        serviceType,
        startDate,
        additionalInfo,
      ),
    );

    return new AppointmentPresenter(appointment);
  }

  @Post('day')
  async getAppointmentsForDay(
    @Body()
    date: Date,
  ) {
    const appointments = await this.queryBus.execute(
      new GetAppointmentsForDayQuery(date),
    );
    return appointments.map(
      (appointment) => new AppointmentPresenter(appointment),
    );
  }
}
