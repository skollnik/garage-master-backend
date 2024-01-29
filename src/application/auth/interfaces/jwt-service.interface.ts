import { TokenPayload } from 'src/domain/auth/token-payload';

export interface IJwtService {
  generateToken(payload: TokenPayload);
  verify(token: string);
}
