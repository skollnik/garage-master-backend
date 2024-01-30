import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegisterUserCommand } from 'src/application/auth/commands/register-user/register-user.command';
import { UserRegisteredPresenter } from './presenters/user-registered.presenter';
import { LoginCommand } from 'src/application/auth/commands/login/login.command';
import { LoggedInPresenter } from './presenters/logged-in.presenter';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
@UseFilters(DomainErrorFilter)
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() { email, password }: LoginDto) {
    const token = await this.commandBus.execute(
      new LoginCommand(email, password),
    );
    return new LoggedInPresenter(token);
  }

  @Post('/register')
  async registerUser(
    @Body() { firstName, lastName, email, password }: RegisterUserDto,
  ) {
    const user = await this.commandBus.execute(
      new RegisterUserCommand(firstName, lastName, email, password),
    );

    return new UserRegisteredPresenter(user);
  }
}
