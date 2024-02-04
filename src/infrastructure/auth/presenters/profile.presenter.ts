import { User } from 'src/domain/auth/model/user';

export class ProfilePresenter {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor({ id, firstName, lastName, email }: User) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
