import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteImageCommand } from './delete-image.command';
import { Inject } from '@nestjs/common';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Media } from 'src/domain/gallery/model/media';

@CommandHandler(DeleteImageCommand)
export class DeleteImageCommandHandler
  implements ICommandHandler<DeleteImageCommand>
{
  constructor(
    @Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService,
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute({ imageId, publicId }: DeleteImageCommand): Promise<any> {
    await this.galleryService.deleteImage(publicId);
    const image = await this.galleryRepository.findMediaById(imageId);
    Media.throwIfNull(image);
    await this.galleryRepository.deleteMedia(imageId);
  }
}
