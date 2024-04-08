import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { settings } from '../../../settings';
import { AccessTokenType } from '../types/access.token.type';
@Injectable()
export class Jwt {
  constructor(private jwt: JwtService) {}

  creatJWT(id: string): AccessTokenType {
    return {
      accessToken: this.jwt.sign(
        { userId: id },
        { expiresIn: settings.TOKEN_LIFE, secret: settings.JWT_SECRET },
      ),
    };
  }

  getUserIdByToken(token: string) {
    try {
      const result: any = this.jwt.verify(token, {
        secret: settings.JWT_SECRET,
      });
      return result.userId;
    } catch (error) {
      return null;
    }
  }

  decodeUserByToken(token: string) {
    try {
      return this.jwt.decode(token);
    } catch (error) {
      return null;
    }
  }
}
