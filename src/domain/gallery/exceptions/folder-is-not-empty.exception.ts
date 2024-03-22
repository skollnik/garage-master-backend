import { BaseException } from 'src/application/shared/base.exception';

export class FolderIsNotEmptyException extends BaseException {
  constructor() {
    super('Folder is not empty!');
  }
}
