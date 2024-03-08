import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { APPOINTMENT_REPOSITORY } from 'src/application/appointment/appointment.constants';
import { AppointmentRepository } from './repositories/appointment.repository';
import { AppointmentMapperFactory } from './factories/appointment-mapper.factory';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../prisma/prisma.module';
import { AppointmentController } from './appointment.controller';
import { CreateAppointmentCommandHandler } from 'src/application/appointment/commands/create-appointment/create-appointment-command.handler';
import { GetAppointmentsForDayQueryHandler } from 'src/application/appointment/queries/get-all-appointments-for-day/get-all-appointments-for-day-query.handler';
import { EditAppointmentCommandHandler } from 'src/application/appointment/commands/edit-appointment/edit-appointment-command.handler';
import { NewAppointmentEventHandler } from 'src/application/appointment/events/new-appointment/new-appointment-event.handler';
import { SharedModule } from '../shared/shared.module';
import { AppointmentUpdatedEventHandler } from 'src/application/appointment/events/appointment-updated/appointment-updated-event.handler';

const commandHandlers = [
  CreateAppointmentCommandHandler,
  EditAppointmentCommandHandler,
];

const queries: Provider[] = [GetAppointmentsForDayQueryHandler];

const events: Provider[] = [
  NewAppointmentEventHandler,
  AppointmentUpdatedEventHandler,
];

const providers: Provider[] = [
  {
    provide: APPOINTMENT_REPOSITORY,
    useClass: AppointmentRepository,
  },
  AppointmentMapperFactory,
];

@Module({
  imports: [CqrsModule, PrismaModule, SharedModule],
  controllers: [AppointmentController],
  providers: [...commandHandlers, ...queries, ...events, ...providers],
  exports: [APPOINTMENT_REPOSITORY],
})
export class AppointmentModule {}
