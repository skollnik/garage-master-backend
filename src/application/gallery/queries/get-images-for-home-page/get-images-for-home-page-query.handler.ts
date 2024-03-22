import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { GetImagesForHomePageQuery } from './get-images-for-home-page.query';
import { ImagesNotUploadedException } from 'src/domain/gallery/exceptions/images-not-uploaded.exception';

@QueryHandler(GetImagesForHomePageQuery)
export class GetImagesForHomePageQueryHandler
  implements IQueryHandler<GetImagesForHomePageQuery>
{
  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute(): Promise<any> {
    const images = await this.galleryRepository.getImagesForHomePage();
    if (!images) {
      throw new ImagesNotUploadedException();
    }

    return images;
  }
}
