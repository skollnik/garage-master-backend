import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { AppointmentUpdatedEvent } from 'src/domain/appointment/events/appointment-updated/appointment-updated.event';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment.interface';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';

@EventsHandler(AppointmentUpdatedEvent)
export class AppointmentUpdatedEventHandler
  implements IEventHandler<AppointmentUpdatedEvent>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}
  async handle({ appointment }: AppointmentUpdatedEvent): Promise<void> {
    const appointmentObject = await this.appointmentRepository.findById(
      appointment.id,
    );
    if (appointment.status === 'CONFIRMED') {
      this.emailService.appointmentConfirmedMail(appointmentObject.email);
    } else {
      this.emailService.appointmentCanceledMail(appointmentObject.email);
    }
  }
}
