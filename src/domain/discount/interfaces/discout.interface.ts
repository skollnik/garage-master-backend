import { Discount } from '../model/discount';

export interface IDiscountRepository {
  getDiscount(): Promise<Discount>;
  createOrUpdateDiscount(discount: Discount): Promise<Discount>;
}
