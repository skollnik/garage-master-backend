import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { GALLERY_REPOSITORY } from '../../gallery.constants';
import { GetAllFoldersQuery } from './get-all-folders.query';

@QueryHandler(GetAllFoldersQuery)
export class GetAllFoldersQueryHandler
  implements IQueryHandler<GetAllFoldersQuery>
{
  constructor(
    @Inject(GALLERY_REPOSITORY)
    private readonly galleryRepository: IGalleryRepository,
  ) {}

  async execute(): Promise<any> {
    const folders = await this.galleryRepository.getAllFolders();

    return folders;
  }
}
