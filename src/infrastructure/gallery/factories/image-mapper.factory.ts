import { FolderEntity, MediaEntity } from '@prisma/client';
import { Folder } from 'src/domain/gallery/model/folder';
import { Media } from 'src/domain/gallery/model/media';
import { IEntityMapperFactory } from 'src/infrastructure/shared/interfaces/entity-mapper-factory.interface';

export class MediaMapperFactory
  implements IEntityMapperFactory<MediaEntity, Media>
{
  fromEntity({
    id,
    publicId,
    url,
    folder,
  }: MediaEntity & { folder?: FolderEntity }): Media {
    const folderMapped = folder
      ? Folder.create({ id: folder.id, name: folder.name })
      : null;

    return Media.create({
      id,
      public_id: publicId,
      url,
      folderId: folderMapped?.id,
    });
  }
}
