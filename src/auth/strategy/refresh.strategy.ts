import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RefrestJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.findById(payload['sub']);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
