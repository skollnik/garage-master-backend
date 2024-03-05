import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { CreateFolderCommand } from './create-folder.command';

@CommandHandler(CreateFolderCommand)
export class CreateFolderCommandHandler
  implements ICommandHandler<CreateFolderCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(GALLERY_SERVICE)
    private readonly galleryService: IGalleryService,
  ) {}
  async execute({ name }: CreateFolderCommand): Promise<any> {
    const createdFolder = this.eventPublisher.mergeObjectContext(
      await this.galleryService.createFolder(name),
    );

    return createdFolder;
  }
}
