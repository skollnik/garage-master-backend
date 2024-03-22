import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { UploadVideoForHomePageCommand } from './upload-video-for-home-page.command';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Media } from 'src/domain/gallery/model/media';

@CommandHandler(UploadVideoForHomePageCommand)
export class UploadVideoForHomePageCommandHandler
  implements ICommandHandler<UploadVideoForHomePageCommand>
{
  constructor(
    @Inject(GALLERY_SERVICE)
    private readonly galleryService: IGalleryService,
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute({ video }: UploadVideoForHomePageCommand): Promise<any> {
    const uploadedVideo = await this.galleryService.uploadVideo(video);

    const videoObject = Media.create({
      public_id: uploadedVideo.public_id,
      url: uploadedVideo.url,
    });

    const createdVideo = this.eventPublisher.mergeObjectContext(
      await this.galleryRepository.uploadVideoForHomePage(videoObject),
    );

    return createdVideo;
  }
}
