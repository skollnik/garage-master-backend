import { BaseException } from 'src/application/shared/base.exception';

export class VideoNotUploadedException extends BaseException {
  constructor() {
    super('Video is not uploaded yet');
  }
}
