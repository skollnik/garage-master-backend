import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { CloudinaryService } from './gallery/cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: GALLERY_SERVICE,
      useClass: CloudinaryService,
    },
  ],
  exports: [GALLERY_SERVICE],
})
export class SharedModule {}
