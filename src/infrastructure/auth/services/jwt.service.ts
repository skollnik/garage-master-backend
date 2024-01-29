import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJwtService } from "src/application/auth/interfaces/jwt-service.interface";
import { TokenPayload } from "src/domain/auth/token-payload";

@Injectable()
export class JWTService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TokenPayload) {
    return this.jwtService.sign(payload);
  }
  
  verify(token: string) {
    return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
  }
}