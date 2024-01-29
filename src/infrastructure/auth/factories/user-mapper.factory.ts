import { UserEntity } from '@prisma/client';
import { User } from 'src/domain/auth/model/user';
import { IEntityMapperFactory } from 'src/infrastructure/shared/interfaces/entity-mapper-factory.interface';

export class UserEntityMapperFactory
  implements IEntityMapperFactory<UserEntity, User>
{
  fromEntity({ id, firstName, lastName, email, password }: UserEntity): User {
    return User.create({ id, firstName, lastName, email, password });
  }
}
