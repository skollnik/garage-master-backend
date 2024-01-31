import { Injectable } from '@nestjs/common';
import { IImageRepository } from 'src/domain/image/interfaces/image-repository.interface';
import { ImageMapperFactory } from '../factories/image-mapper.factory';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Image } from 'src/domain/image/model/image';

@Injectable()
export class ImageRepository implements IImageRepository {
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
