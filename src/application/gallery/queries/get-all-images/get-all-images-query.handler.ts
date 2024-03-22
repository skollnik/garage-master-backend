import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Media } from 'src/domain/gallery/model/media';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { GetAllImagesQuery } from './get-all-images.query';

@QueryHandler(GetAllImagesQuery)
export class GetAllImagesQueryHandler
  implements IQueryHandler<GetAllImagesQuery>
{
  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute(): Promise<Media[]> {
    const images = await this.galleryRepository.findAll();
    return images;
  }
}
