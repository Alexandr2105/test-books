import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dto/create.user.dto';
import { LocalAuthGuard } from '../../common/guards/local.auth.guard';
import { RegistrationUserCommand } from './useCases/registration.user.use-case';
import { CreateAccessTokenCommand } from './useCases/create.access.token.use-case';
import { AccessTokenType } from '../../common/types/access.token.type';

@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus) {}

  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationUsers(@Body() body: CreateUserDto): Promise<void> {
    await this.commandBus.execute(new RegistrationUserCommand(body));
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Req() req: any): Promise<AccessTokenType> {
    return await this.commandBus.execute(
      new CreateAccessTokenCommand(req.user.id),
    );
  }
}
