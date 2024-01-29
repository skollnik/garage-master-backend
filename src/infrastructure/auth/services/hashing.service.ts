import { Injectable } from '@nestjs/common';
import { IHashingService } from 'src/application/auth/interfaces/hashing-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService implements IHashingService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    existingPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, existingPassword);
  }
}
