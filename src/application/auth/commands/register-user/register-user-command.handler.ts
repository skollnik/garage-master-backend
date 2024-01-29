import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor() {}

  async execute({
    email,
    password,
    firstName,
    lastName,
  }: RegisterUserCommand): Promise<any> {}
}
