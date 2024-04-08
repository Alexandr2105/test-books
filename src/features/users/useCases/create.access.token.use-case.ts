import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Jwt } from '../../../common/jwt/jwt';
import { AccessTokenType } from '../../../common/types/access.token.type';

export class CreateAccessTokenCommand {
  constructor(public userId: string) {}
}
@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenUseCase
  implements ICommandHandler<CreateAccessTokenCommand>
{
  constructor(private jwtService: Jwt) {}

  async execute(command: CreateAccessTokenCommand): Promise<AccessTokenType> {
    return this.jwtService.creatJWT(command.userId);
  }
}
