import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserEntity } from '../entities/user.entity';
import { BcryptService } from '../../../common/bcript/bcript.service';
import { UsersRepository } from '../users.repository';

export class RegistrationUserCommand {
  constructor(public body: CreateUserDto) {}
}

@CommandHandler(RegistrationUserCommand)
export class RegistrationUserUseCase
  implements ICommandHandler<RegistrationUserCommand>
{
  constructor(
    private bcryptService: BcryptService,
    private userRepo: UsersRepository,
  ) {}
  async execute(command: RegistrationUserCommand): Promise<void> {
    const hash = await this.bcryptService.generateHashForNewUser(
      command.body.password,
    );

    const newUser: UserEntity = new UserEntity(
      command.body.login,
      hash,
      command.body.email,
    );

    await this.userRepo.createUser(newUser);
  }
}
