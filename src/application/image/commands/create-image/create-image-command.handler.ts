import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IImageUploadService } from 'src/application/shared/interfaces/image-upload-service.interface';
import { IMAGE_UPLOAD_SERVICE } from 'src/application/shared/shared.constants';
import { InvalidFileTypeException } from 'src/domain/image/exceptions/invalid-file-type.exception';
import { IImageRepository } from 'src/domain/image/interfaces/image-repository.interface';
import { Image } from 'src/domain/image/model/image';
import { IMAGE_REPOSITORY } from '../../image.constants';
import { CreateImageCommand } from './create-image.command';

@CommandHandler(CreateImageCommand)
export class CreateImageCommandHandler
  implements ICommandHandler<CreateImageCommand>
{
  constructor(
    @Inject(IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
    private readonly eventPublisher: EventPublisher,
    @Inject(IMAGE_UPLOAD_SERVICE)
    private readonly imageUploadService: IImageUploadService,
  ) {}
  async execute({ file }: CreateImageCommand): Promise<Image> {
    const uploadedImage = await this.imageUploadService
      .uploadImage(file)
      .catch(() => {
        throw new InvalidFileTypeException();
      });

    const image = Image.create({
      imgUrl: uploadedImage.url,
    });

    const createdImage = this.eventPublisher.mergeObjectContext(
      await this.imageRepository.create(image),
    );
    createdImage.commit();

    return createdImage;
  }
}
