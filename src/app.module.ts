import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ServiceTypeModule } from './infrastructure/service-type/service-type.module';
import { AppointmentModule } from './infrastructure/appointment/appointment.module';
import { GalleryModule } from './infrastructure/gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ServiceTypeModule,
    AppointmentModule,
    GalleryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
