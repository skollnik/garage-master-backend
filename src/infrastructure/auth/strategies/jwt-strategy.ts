import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  JWT_SECRET,
  USER_REPOSITORY,
} from 'src/application/auth/auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user.interface';
import { TokenPayload } from 'src/domain/auth/token-payload';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(JWT_SECRET),
    });
  }
  async validate({ id }: TokenPayload) {
    const user = this.userRepository.findById(id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
