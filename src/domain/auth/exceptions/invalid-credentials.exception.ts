import { BaseException } from "src/application/shared/base.exception";

export class InvalidCredentialsException extends BaseException {
    constructor() {
      super('Invalid login credentials, please try again!');
    }
  }