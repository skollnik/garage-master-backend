export class DiscountPresenter {
  public readonly id: number;
  public readonly text: string;
  public readonly isActive: boolean;

  constructor({ id, text, isActive }) {
    this.id = id;
    this.text = text;
    this.isActive = isActive;
  }
}
