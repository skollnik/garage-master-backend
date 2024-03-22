import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { CreateFolderCommand } from './create-folder.command';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { FolderAlreadyExistsException } from 'src/domain/gallery/exceptions/folder-already-exists.exception';

@CommandHandler(CreateFolderCommand)
export class CreateFolderCommandHandler
  implements ICommandHandler<CreateFolderCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(GALLERY_SERVICE)
    private readonly galleryService: IGalleryService,
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}
  async execute({ name }: CreateFolderCommand): Promise<any> {
    const folder = await this.galleryRepository.findFolderByName(name);
    if (folder) throw new FolderAlreadyExistsException();

    this.eventPublisher.mergeObjectContext(
      await this.galleryService.createFolder(name),
    );

    const createdFolder = this.eventPublisher.mergeObjectContext(
      await this.galleryRepository.createFolder(name),
    );

    return createdFolder;
  }
}
