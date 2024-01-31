import { AggregateRoot } from '@nestjs/cqrs';

export class Image extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly imgUrl: string,
  ) {
    super();
  }

  static create({ id, imgUrl }: Partial<Image>) {
    return new Image(id, imgUrl);
  }
}
