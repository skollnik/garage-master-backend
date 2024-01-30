import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }

  static create({ id, firstName, lastName, email, password }: Partial<User>) {
    return new User(id, firstName, lastName, email, password);
  }
}
