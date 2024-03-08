import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { ContactEventHandler } from 'src/application/contact/events/contact-event.handler';
import { SharedModule } from '../shared/shared.module';
import { ContactController } from './contact.controller';

const events: Provider[] = [ContactEventHandler];

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [ContactController],
  providers: [...events],
})
export class ContactModule {}
