import { BaseException } from 'src/application/shared/base.exception';

export class ImagesNotUploadedException extends BaseException {
  constructor() {
    super('Images are not uploaded yet');
  }
}
