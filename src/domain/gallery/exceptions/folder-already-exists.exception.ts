import { BaseException } from 'src/application/shared/base.exception';

export class FolderAlreadyExistsException extends BaseException {
  constructor() {
    super('Folder with this name already exists!');
  }
}
