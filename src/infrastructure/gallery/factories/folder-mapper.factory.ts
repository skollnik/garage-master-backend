import { FolderEntity, MediaEntity } from '@prisma/client';
import { Folder } from 'src/domain/gallery/model/folder';
import { Media } from 'src/domain/gallery/model/media';
import { IEntityMapperFactory } from 'src/infrastructure/shared/interfaces/entity-mapper-factory.interface';

export class FolderMapperFactory
  implements IEntityMapperFactory<FolderEntity, Folder>
{
  fromEntity({
    id,
    name,
    media,
  }: FolderEntity & { media?: MediaEntity[] }): Folder {
    const mediaMapped = media
      ? media.map((media) =>
          Media.create({
            id: media.id,
            url: media.url,
            folderId: media.folderId,
          }),
        )
      : [];

    return Folder.create({ id, name, media: mediaMapped });
  }
}
