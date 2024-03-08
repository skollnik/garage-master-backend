import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  EMAIL_SERVICE,
  GALLERY_SERVICE,
} from 'src/application/shared/shared.constants';
import { CloudinaryService } from './gallery/cloudinary.service';
import { NodemailerService } from './email/nodemailer.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: GALLERY_SERVICE,
      useClass: CloudinaryService,
    },
    {
      provide: EMAIL_SERVICE,
      useClass: NodemailerService,
    },
  ],
  exports: [GALLERY_SERVICE, EMAIL_SERVICE],
})
export class SharedModule {}
