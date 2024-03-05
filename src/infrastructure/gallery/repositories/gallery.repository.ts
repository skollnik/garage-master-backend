import { Injectable } from '@nestjs/common';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { ImageMapperFactory } from '../factories/image-mapper.factory';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Image } from 'src/domain/gallery/model/image';

@Injectable()
export class GalleryRepository implements IGalleryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageMapperFactory: ImageMapperFactory,
  ) {}

  async create({ imgUrl }: Image): Promise<Image> {
    const saved = await this.prisma.imageEntity.create({
      data: { imgUrl },
    });

    return this.imageMapperFactory.fromEntity(saved);
  }

  async findAll(): Promise<Image[]> {
    const photos = await this.prisma.imageEntity.findMany({});

    return photos.map((photo) => this.imageMapperFactory.fromEntity(photo));
  }
}
