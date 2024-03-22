import { BaseException } from 'src/application/shared/base.exception';

export class ServiceTypeNotFoundException extends BaseException {
  constructor() {
    super('Service type with given id not found!');
  }
}
