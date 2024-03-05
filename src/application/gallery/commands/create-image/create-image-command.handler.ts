import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InvalidFileTypeException } from 'src/domain/gallery/exceptions/invalid-file-type.exception';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Image } from 'src/domain/gallery/model/image';
import { CreateImageCommand } from './create-image.command';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';

@CommandHandler(CreateImageCommand)
export class CreateImageCommandHandler
  implements ICommandHandler<CreateImageCommand>
{
  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
    private readonly eventPublisher: EventPublisher,
    @Inject(GALLERY_SERVICE)
    private readonly galleryService: IGalleryService,
  ) {}
  async execute({ file }: CreateImageCommand): Promise<Image> {
    const uploadedImage = await this.galleryService
      .uploadImage(file)
      .catch(() => {
        throw new InvalidFileTypeException();
      });

      const image = Image.create({
      imgUrl: uploadedImage.url,
    });

    const createdImage = this.eventPublisher.mergeObjectContext(
      await this.galleryRepository.create(image),
    );
    createdImage.commit();

    return createdImage;
  }
}
