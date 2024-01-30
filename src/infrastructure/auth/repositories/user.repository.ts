import { IUserRepository } from 'src/domain/auth/interfaces/user.interface';
import { User } from 'src/domain/auth/model/user';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { UserEntityMapperFactory } from '../factories/user-mapper.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapperFactory: UserEntityMapperFactory,
  ) {}

  async create({ firstName, lastName, email, password }: User): Promise<User> {
    const userEntity = await this.prisma.userEntity.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    return this.mapperFactory.fromEntity(userEntity);
  }

  async findById(userId: number): Promise<User> {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { id: userId },
    });
    if (!userEntity) return null;

    return this.mapperFactory.fromEntity(userEntity);
  }

  async findByEmail(email: string): Promise<User> {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { email },
    });
    if (!userEntity) return null;

    return this.mapperFactory.fromEntity(userEntity);
  }
}
