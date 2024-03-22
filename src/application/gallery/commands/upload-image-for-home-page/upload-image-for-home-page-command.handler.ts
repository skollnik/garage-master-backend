import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { UploadImageForHomePageCommand } from './upload-image-for-home-page.command';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Media } from 'src/domain/gallery/model/media';

@CommandHandler(UploadImageForHomePageCommand)
export class UploadImageForHomePageCommandHandler
  implements ICommandHandler<UploadImageForHomePageCommand>
{
  constructor(
    @Inject(GALLERY_SERVICE)
    private readonly galleryService: IGalleryService,
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute({ image }: UploadImageForHomePageCommand): Promise<any> {
    const uploadedImage =
      await this.galleryService.uploadImageForHomePage(image);

    const imageObject = Media.create({
      public_id: uploadedImage.public_id,
      url: uploadedImage.url,
    });

    const createdImage = this.eventPublisher.mergeObjectContext(
      await this.galleryRepository.uploadImageForHomePage(imageObject),
    );

    return createdImage;
  }
}
