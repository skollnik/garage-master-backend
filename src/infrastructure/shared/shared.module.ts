import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  IMAGE_UPLOAD_SERVICE,
} from 'src/application/shared/shared.constants';
import { CloudinaryService } from './image-upload/cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IMAGE_UPLOAD_SERVICE,
      useClass: CloudinaryService,
    },
  ],
  exports: [IMAGE_UPLOAD_SERVICE],
})
export class SharedModule {}