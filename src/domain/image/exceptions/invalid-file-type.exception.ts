import { BaseException } from "src/application/shared/base.exception";

export class InvalidFileTypeException extends BaseException {
    constructor() {
      super('Invalid file type!');
    }
  }