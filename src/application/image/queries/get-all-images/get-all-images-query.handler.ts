import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IImageRepository } from 'src/domain/image/interfaces/image-repository.interface';
import { IMAGE_REPOSITORY } from '../../image.constants';
import { GetAllImagesQuery } from './get-all-images.query';
import { Image } from 'src/domain/image/model/image';

@QueryHandler(GetAllImagesQuery)
export class GetAllImagesQueryHandler
  implements IQueryHandler<GetAllImagesQuery>
{
  constructor(
    @Inject(IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}

  async execute(): Promise<Image[]> {
    const images = await this.imageRepository.findAll();
    return images;
  }
}
