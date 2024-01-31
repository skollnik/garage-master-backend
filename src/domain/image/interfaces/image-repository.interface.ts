import { Image } from '../model/image';

export interface IImageRepository {
  create(image: Image): Promise<Image>;
  findAll(): Promise<Image[]>;
}
