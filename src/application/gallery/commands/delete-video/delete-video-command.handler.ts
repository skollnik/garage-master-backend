import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { DeleteVideoCommand } from './delete-video.command';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { Media } from 'src/domain/gallery/model/media';

@CommandHandler(DeleteVideoCommand)
export class DeleteVideoCommandHandler
  implements ICommandHandler<DeleteVideoCommand>
{
  constructor(
    @Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService,
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute({ videoId, publicId }: DeleteVideoCommand): Promise<any> {
    await this.galleryService.deleteVideoFromHomePage(publicId);
    const video = await this.galleryRepository.findMediaById(videoId);
    Media.throwIfNull(video);
    await this.galleryRepository.deleteMedia(videoId);
  }
}
