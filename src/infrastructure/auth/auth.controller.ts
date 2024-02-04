import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from 'src/application/auth/commands/login/login.command';
import { RegisterUserCommand } from 'src/application/auth/commands/register-user/register-user.command';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LoggedInPresenter } from './presenters/logged-in.presenter';
import { ProfilePresenter } from './presenters/profile.presenter';
import { UserRegisteredPresenter } from './presenters/user-registered.presenter';
import { ReqWithUser } from './types/req-with-user';

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

  @UseGuards(JwtGuard)
  @Get('/me')
  async getProfile(@Req() { user }: ReqWithUser) {
    return new ProfilePresenter(user);
  }
}
