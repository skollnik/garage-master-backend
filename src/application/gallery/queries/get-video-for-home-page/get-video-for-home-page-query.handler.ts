import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { GetVideoForHomePageQuery } from './get-video-for-home-page.query';
import { VideoNotUploadedException } from 'src/domain/gallery/exceptions/video-not-uploaded.exception';

@QueryHandler(GetVideoForHomePageQuery)
export class GetVideoForHomePageQueryHandler
  implements IQueryHandler<GetVideoForHomePageQuery>
{
  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute(): Promise<any> {
    const video = await this.galleryRepository.getVideoForHomePage();
    if (!video) {
      throw new VideoNotUploadedException();
    }

    return video;
  }
}
