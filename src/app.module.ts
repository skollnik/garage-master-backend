import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ServiceTypeModule } from './infrastructure/service-type/service-type.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ServiceTypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
