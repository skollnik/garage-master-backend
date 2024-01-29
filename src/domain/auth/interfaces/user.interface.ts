import { User } from '../model/user';

export interface IUserInterface {
  create(user: User): Promise<User>;
  findById(userId: number): Promise<User>;
}
