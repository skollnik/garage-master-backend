import { BaseException } from 'src/application/shared/base.exception';

export class DiscountNotFoundException extends BaseException {
  constructor() {
    super('Discount not found!');
  }
}
