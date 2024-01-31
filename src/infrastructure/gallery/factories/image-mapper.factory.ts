import { ImageEntity } from '@prisma/client';
import { Image } from 'src/domain/image/model/image';
import { IEntityMapperFactory } from 'src/infrastructure/shared/interfaces/entity-mapper-factory.interface';

export class ImageMapperFactory
  implements IEntityMapperFactory<ImageEntity, Image>
{
  fromEntity({ id, imgUrl }: ImageEntity): Image {
    return Image.create({ id, imgUrl });
  }
}
