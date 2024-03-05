import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFolderCommandHandler } from 'src/application/gallery/commands/create-folder/create-folder-command.handler';
import { CreateImageCommandHandler } from 'src/application/gallery/commands/create-image/create-image-command.handler';
import { GALLERY_REPOSITORY } from 'src/application/gallery/gallery.constants';
import { GetAllFoldersQueryHandler } from 'src/application/gallery/queries/get-all-folders/get-all-folders-query.handler';
import { GetAllImagesQueryHandler } from 'src/application/gallery/queries/get-all-images/get-all-images-query.handler';
import { GetImagesByFolderQueryHandler } from 'src/application/gallery/queries/get-images-by-folder/get-images-by-folder-query.handler';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedModule } from '../shared/shared.module';
import { ImageMapperFactory } from './factories/image-mapper.factory';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './repositories/gallery.repository';

const commandHandlers: Provider[] = [
  CreateImageCommandHandler,
  CreateFolderCommandHandler,
];

const queries: Provider[] = [
  GetAllImagesQueryHandler,
  GetAllFoldersQueryHandler,
  GetImagesByFolderQueryHandler,
];

const providers: Provider[] = [
  {
    provide: GALLERY_REPOSITORY,
    useClass: GalleryRepository,
  },
  ImageMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [GalleryController],
  providers: [...commandHandlers, ...queries, ...providers],
  exports: [GALLERY_REPOSITORY],
})
export class GalleryModule {}
