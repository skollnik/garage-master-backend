import { BaseException } from 'src/application/shared/base.exception';

export class MediaNotFoundException extends BaseException {
  constructor() {
    super('Media with given id not found!');
  }
}
