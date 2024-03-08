import { Appointment } from '../../model/appointment';

export class AppointmentUpdatedEvent {
  constructor(public readonly appointment: Appointment) {}
}
