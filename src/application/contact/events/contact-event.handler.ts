import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { ContactEvent } from 'src/domain/contact/events/contact.event';

@EventsHandler(ContactEvent)
export class ContactEventHandler implements IEventHandler<ContactEvent> {
  constructor(
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}

  async handle({
    firstName,
    lastName,
    email,
    phoneNumber,
    message,
  }: ContactEvent): Promise<void> {
    await this.emailService.newContactMail(
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    );
  }
}
