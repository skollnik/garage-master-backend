export class Car {
  constructor(
    public readonly id: number,
    public readonly model: string,
  ) {}

  static create({ id, model }: Partial<Car>) {
    return new Car(id, model);
  }
}
