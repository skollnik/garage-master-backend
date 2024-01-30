import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import {
  HASHING_SERVICE,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  JWT_SERVICE,
  USER_REPOSITORY,
} from 'src/application/auth/auth.constants';
import { LoginCommandHandler } from 'src/application/auth/commands/login/login-command.handler';
import { RegisterUserCommandHandler } from 'src/application/auth/commands/register-user/register-user-command.handler';
import { UserRepository } from './repositories/user.repository';
import { HashingService } from './services/hashing.service';
import { JWTService } from './services/jwt.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserEntityMapperFactory } from './factories/user-mapper.factory';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

const commandHandlers = [RegisterUserCommandHandler, LoginCommandHandler];

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: HASHING_SERVICE,
    useClass: HashingService,
  },
  {
    provide: JWT_SERVICE,
    useClass: JWTService,
  },
  JwtStrategy,
  UserEntityMapperFactory,
];

@Module({
  imports: [
    PrismaModule,
    CqrsModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(JWT_EXPIRES_IN),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [...commandHandlers, ...providers],
  exports: [USER_REPOSITORY, UserEntityMapperFactory],
})
export class AuthModule {}
