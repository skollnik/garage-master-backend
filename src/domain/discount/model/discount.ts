import { AggregateRoot } from '@nestjs/cqrs';

export class Discount extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly isActive: boolean,
  ) {
    super();
  }

  static create({ id, text, isActive }: Partial<Discount>) {
    return new Discount(id, text, isActive);
  }
}
