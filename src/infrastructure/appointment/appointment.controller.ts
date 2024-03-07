import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAppointmentCommand } from 'src/application/appointment/commands/create-appointment/create-appointment.command';
import { EditAppointmentCommand } from 'src/application/appointment/commands/edit-appointment/edit-appointment.command';
import { GetAppointmentsForDayQuery } from 'src/application/appointment/queries/get-all-appointments-for-day/get-all-appointments-for-day.query';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { NewAppointmentDto } from './dtos/new-appointment.dto';
import { AppointmentPresenter } from './presenters/appointment.presenter';

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
      email,
      startDate,
      additionalInfo,
      authorized,
    }: NewAppointmentDto,
  ) {
    const status = authorized
      ? AppointmentStatus.CONFIRMED
      : AppointmentStatus.PENDING;

    const appointment = await this.commandBus.execute(
      new CreateAppointmentCommand(
        firstName,
        lastName,
        car,
        serviceType,
        email,
        startDate,
        status,
        additionalInfo,
      ),
    );

    return new AppointmentPresenter(appointment);
  }

  @UseGuards(JwtGuard)
  @Patch(':appointmentId')
  async editAppointment(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Body() { status }: { status: AppointmentStatus },
  ) {
    await this.commandBus.execute(
      new EditAppointmentCommand(appointmentId, status),
    );

    return { message: 'Successfully updated' };
  }

  @Post('day')
  async getAppointmentsForDay(
    @Body()
    { date }: { date: Date },
  ) {
    const appointments = await this.queryBus.execute(
      new GetAppointmentsForDayQuery(date),
    );
    return appointments.map(
      (appointment) => new AppointmentPresenter(appointment),
    );
  }
}
