import { Appointment } from '../../model/appointment';

export class NewAppointmentEvent {
  constructor(public readonly appointment: Appointment) {}
}
