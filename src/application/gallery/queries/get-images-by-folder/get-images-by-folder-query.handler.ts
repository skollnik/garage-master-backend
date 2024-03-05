import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { GetImagesByFolderQuery } from './get-images-by-folder.query';

@QueryHandler(GetImagesByFolderQuery)
export class GetImagesByFolderQueryHandler
  implements IQueryHandler<GetImagesByFolderQuery>
{
  constructor(
    @Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService,
  ) {}

  async execute({ folder }: GetImagesByFolderQuery): Promise<any> {
    const images = await this.galleryService.getAllImagesByFolder(folder);

    return images.resources;
  }
}
