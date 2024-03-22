import { BaseException } from 'src/application/shared/base.exception';

export class FolderNotFoundException extends BaseException {
  constructor() {
    super('Folder not found!');
  }
}
