import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { NewAppointmentEvent } from 'src/domain/appointment/events/new-appointment/new-appointment.event';

@EventsHandler(NewAppointmentEvent)
export class NewAppointmentEventHandler
  implements IEventHandler<NewAppointmentEvent>
{
  constructor(@Inject(EMAIL_SERVICE) private readonly emailService: IEmailService) {}

  async handle({ appointment }: NewAppointmentEvent) {
    this.emailService.newAppointmentMail(
      appointment.firstName,
      appointment.lastName,
      appointment.car.model,
      appointment.email,
      appointment.serviceType.category,
      appointment.additionalInfo,
      appointment.startDate.toDateString(),
    );
  }
}
