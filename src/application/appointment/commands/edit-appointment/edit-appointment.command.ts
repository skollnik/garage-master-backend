import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';

export class EditAppointmentCommand {
  constructor(
    public readonly id: number,
    public readonly status: AppointmentStatus,
  ) {}
}
