import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersQueryRepository } from '../../features/users/users.query.repository';
import { BcryptService } from '../bcript/bcript.service';
import { UserEntity } from '../../features/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private userRepo: UsersQueryRepository,
    private genHash: BcryptService,
  ) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepo.getUserByEmail(email.toLowerCase());

    const hashPassword = await this.genHash.generateHash(
      password,
      user.password,
    );

    if (user.password === hashPassword) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
