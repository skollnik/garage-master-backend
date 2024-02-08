export class ServiceTypePresenter {
  public readonly id: number;
  public readonly category: string;
  public readonly duration: number;

  constructor({ id, category, duration }) {
    this.id = id;
    this.category = category;
    this.duration = duration;
  }
}
