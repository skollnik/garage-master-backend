import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { Inject } from '@nestjs/common';
import { HASHING_SERVICE, USER_REPOSITORY } from '../../auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user.interface';
import { IHashingService } from '../../interfaces/hashing-service.interface';
import { User } from 'src/domain/auth/model/user';
import { EmailAlreadyTakenException } from 'src/domain/auth/exceptions/email-already-taken.exception';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASHING_SERVICE) private readonly hashingService: IHashingService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    email,
    password,
    firstName,
    lastName,
  }: RegisterUserCommand): Promise<any> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) throw new EmailAlreadyTakenException();
    const hashedPassword = await this.hashingService.hashPassword(password);
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const createdUser = this.eventPublisher.mergeObjectContext(
      await this.userRepository.create(user),
    );

    createdUser.commit();
    return createdUser;
  }
}
