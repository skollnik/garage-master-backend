import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFolderCommandHandler } from 'src/application/gallery/commands/create-folder/create-folder-command.handler';
import { UploadImageCommandHandler } from 'src/application/gallery/commands/upload-image/upload-image-command.handler';
import { GALLERY_REPOSITORY } from 'src/application/gallery/gallery.constants';
import { GetAllFoldersQueryHandler } from 'src/application/gallery/queries/get-all-folders/get-all-folders-query.handler';
import { GetAllImagesQueryHandler } from 'src/application/gallery/queries/get-all-images/get-all-images-query.handler';
import { GetImagesByFolderQueryHandler } from 'src/application/gallery/queries/get-images-by-folder/get-images-by-folder-query.handler';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedModule } from '../shared/shared.module';
import { MediaMapperFactory } from './factories/image-mapper.factory';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './repositories/gallery.repository';
import { UploadImageForHomePageCommandHandler } from 'src/application/gallery/commands/upload-image-for-home-page/upload-image-for-home-page-command.handler';
import { UploadVideoForHomePageCommandHandler } from 'src/application/gallery/commands/upload-video-for-home-page/upload-video-for-home-page-command.handler';
import { DeleteImageCommandHandler } from 'src/application/gallery/commands/delete-image/delete-image-command.handler';
import { GetImagesForHomePageQueryHandler } from 'src/application/gallery/queries/get-images-for-home-page/get-images-for-home-page-query.handler';
import { GetVideoForHomePageQueryHandler } from 'src/application/gallery/queries/get-video-for-home-page/get-video-for-home-page-query.handler';
import { DeleteVideoCommandHandler } from 'src/application/gallery/commands/delete-video/delete-video-command.handler';
import { DeleteFolderCommandHandler } from 'src/application/gallery/commands/delete-folder/delete.folder-command.handler';
import { FolderMapperFactory } from './factories/folder-mapper.factory';

const commandHandlers: Provider[] = [
  UploadImageCommandHandler,
  UploadImageForHomePageCommandHandler,
  UploadVideoForHomePageCommandHandler,
  CreateFolderCommandHandler,
  DeleteImageCommandHandler,
  DeleteVideoCommandHandler,
  DeleteFolderCommandHandler,
];

const queries: Provider[] = [
  GetAllImagesQueryHandler,
  GetAllFoldersQueryHandler,
  GetImagesByFolderQueryHandler,
  GetImagesForHomePageQueryHandler,
  GetVideoForHomePageQueryHandler,
];

const providers: Provider[] = [
  {
    provide: GALLERY_REPOSITORY,
    useClass: GalleryRepository,
  },
  MediaMapperFactory,
  FolderMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [GalleryController],
  providers: [...commandHandlers, ...queries, ...providers],
  exports: [GALLERY_REPOSITORY],
})
export class GalleryModule {}
