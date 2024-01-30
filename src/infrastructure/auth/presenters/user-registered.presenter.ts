import { User } from 'src/domain/auth/model/user';

export class UserRegisteredPresenter {
  public readonly id: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;

  constructor({ id, firstName, lastName, email }: User) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
