import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import { GALLERY_SERVICE } from 'src/application/shared/shared.constants';
import { GetAllFoldersQuery } from './get-all-folders.query';

@QueryHandler(GetAllFoldersQuery)
export class GetAllFoldersQueryHandler
  implements IQueryHandler<GetAllFoldersQuery>
{
  constructor(
    @Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService,
  ) {}

  async execute(): Promise<any> {
    const folders = await this.galleryService.getFolders();

    return folders.folders;
  }
}
