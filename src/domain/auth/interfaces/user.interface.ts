import { User } from '../model/user';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(userId: number): Promise<User>;
}
