import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateImageCommandHandler } from 'src/application/gallery/commands/create-image/create-image-command.handler';
import { IMAGE_REPOSITORY } from 'src/application/gallery/image.constants';
import { GetAllImagesQueryHandler } from 'src/application/gallery/queries/get-all-images/get-all-images-query.handler';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedModule } from '../shared/shared.module';
import { ImageMapperFactory } from './factories/image-mapper.factory';
import { ImageController } from './image.controller';
import { ImageRepository } from './repositories/image.repository';

const commandHandlers: Provider[] = [CreateImageCommandHandler];

const queries: Provider[] = [GetAllImagesQueryHandler];

const providers: Provider[] = [
  {
    provide: IMAGE_REPOSITORY,
    useClass: ImageRepository,
  },
  ImageMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [ImageController],
  providers: [...commandHandlers, ...queries, ...providers],
  exports: [IMAGE_REPOSITORY],
})
export class PostModule {}
