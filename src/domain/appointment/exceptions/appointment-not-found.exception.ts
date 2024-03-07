import { BaseException } from 'src/application/shared/base.exception';

export class AppointmentNotFoundException extends BaseException {
  constructor() {
    super('Appointment with given id not found!');
  }
}
