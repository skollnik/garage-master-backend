import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { DeleteFolderCommand } from './delete-folder.command';
import { FolderIsNotEmptyException } from 'src/domain/gallery/exceptions/folder-is-not-empty.exception';
import { FolderNotFoundException } from 'src/domain/gallery/exceptions/folder-not-found.exceptionts';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Folder } from 'src/domain/gallery/model/folder';

@CommandHandler(DeleteFolderCommand)
export class DeleteFolderCommandHandler
  implements ICommandHandler<DeleteFolderCommand>
{
  constructor(
    @Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService,
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute({ folder }: DeleteFolderCommand): Promise<any> {
    await this.galleryService.deleteFolder(folder).catch((e) => {
      if (e.http_code === 400) {
        throw new FolderIsNotEmptyException();
      }
      if (e.http_code === 404) {
        throw new FolderNotFoundException();
      }
    });

    const folderEntity = await this.galleryRepository.findFolderByName(folder);
    Folder.throwIfNull(folderEntity);
    await this.galleryRepository.deleteFolder(folder);
  }
}
