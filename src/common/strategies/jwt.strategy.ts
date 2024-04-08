import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { settings } from '../../../settings';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: settings.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload) {
      return payload.userId;
    }
  }
}
