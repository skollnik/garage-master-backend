import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InvalidFileTypeException } from 'src/domain/gallery/exceptions/invalid-file-type.exception';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Media } from 'src/domain/gallery/model/media';
import { UploadImageCommand } from './upload-image.command';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';

@CommandHandler(UploadImageCommand)
export class UploadImageCommandHandler
  implements ICommandHandler<UploadImageCommand>
{
  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
    private readonly eventPublisher: EventPublisher,
    @Inject(GALLERY_SERVICE)
    private readonly galleryService: IGalleryService,
  ) {}
  async execute({
    image,
    folderId,
    folderName,
  }: UploadImageCommand): Promise<Media> {
    const uploadedImage = await this.galleryService.uploadImage(
      image,
      folderName,
    );

    const imageObject = Media.create({
      public_id: uploadedImage.public_id,
      url: uploadedImage.url,
      folderId,
    });

    const createdImage = this.eventPublisher.mergeObjectContext(
      await this.galleryRepository.uploadImage(imageObject),
    );

    return createdImage;
  }
}
