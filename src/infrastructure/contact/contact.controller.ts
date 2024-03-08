import { Body, Controller, Post } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { NewContactDto } from './dtos/new-contact.dto';
import { ContactEvent } from 'src/domain/contact/events/contact.event';

@Controller('contact')
export class ContactController {
  constructor(private readonly eventBus: EventBus) {}

  @Post()
  async newContact(
    @Body() { firstName, lastName, email, phoneNumber, message }: NewContactDto,
  ) {
    this.eventBus.publish(
      new ContactEvent(firstName, lastName, email, phoneNumber, message),
    );
  }
}
