import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { GetImagesByFolderQuery } from './get-images-by-folder.query';

@QueryHandler(GetImagesByFolderQuery)
export class GetImagesByFolderQueryHandler
  implements IQueryHandler<GetImagesByFolderQuery>
{
  constructor(
    @Inject(GALLERY_REPOSITORY) private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute({ folderId }: GetImagesByFolderQuery): Promise<any> {
    const images = await this.galleryRepository.getAllImagesByFolder(folderId);

    return images;
  }
}
