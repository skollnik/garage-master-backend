import { Image } from '../model/image';

export interface IGalleryRepository {
  create(image: Image): Promise<Image>;
  findAll(): Promise<Image[]>;
}
