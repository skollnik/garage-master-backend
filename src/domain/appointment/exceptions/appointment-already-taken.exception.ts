import { BaseException } from 'src/application/shared/base.exception';

export class AppointmentAlreadyTakenException extends BaseException {
  constructor() {
    super('The appointment is already taken!');
  }
}
