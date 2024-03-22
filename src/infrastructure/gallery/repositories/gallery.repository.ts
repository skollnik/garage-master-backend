import { Injectable } from '@nestjs/common';
import { IGalleryRepository } from 'src/domain/gallery/interfaces/gallery-repository.interface';
import { MediaMapperFactory } from '../factories/image-mapper.factory';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Media } from 'src/domain/gallery/model/media';
import { Folder } from 'src/domain/gallery/model/folder';
import { FolderMapperFactory } from '../factories/folder-mapper.factory';

@Injectable()
export class GalleryRepository implements IGalleryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaMapperFactory: MediaMapperFactory,
    private readonly folderMapperFactory: FolderMapperFactory,
  ) {}

  async uploadImage({ public_id, url, folderId }: Media): Promise<Media> {
    const saved = await this.prisma.mediaEntity.create({
      data: { publicId: public_id, url, folderId },
    });

    return this.mediaMapperFactory.fromEntity(saved);
  }

  async uploadImageForHomePage(image: Media): Promise<Media> {
    let folder;
    folder = await this.prisma.folderEntity.findUnique({
      where: { name: 'Home' },
    });

    if (!folder) {
      folder = await this.prisma.folderEntity.create({
        data: { name: 'Home' },
      });
    }

    const saved = await this.prisma.mediaEntity.create({
      data: { publicId: image.public_id, url: image.url, folderId: folder.id },
    });

    return this.mediaMapperFactory.fromEntity(saved);
  }

  async uploadVideoForHomePage(video: Media): Promise<Media> {
    let folder;
    folder = await this.prisma.folderEntity.findUnique({
      where: { name: 'Video' },
    });

    if (!folder) {
      folder = await this.prisma.folderEntity.create({
        data: { name: 'Video' },
      });
    }

    const saved = await this.prisma.mediaEntity.create({
      data: { publicId: video.public_id, url: video.url, folderId: folder.id },
    });

    return this.mediaMapperFactory.fromEntity(saved);
  }

  async findMediaById(imageId: number): Promise<Media> {
    const image = await this.prisma.mediaEntity.findUnique({
      where: { id: imageId },
    });
    if (!image) return null;

    return this.mediaMapperFactory.fromEntity(image);
  }

  async getAllFolders(): Promise<Folder[]> {
    const folders = await this.prisma.folderEntity.findMany({
      where: {
        NOT: [{ name: 'Home' }, { name: 'Video' }],
      },
    });

    return folders.map((folder) => this.folderMapperFactory.fromEntity(folder));
  }

  async deleteMedia(mediaId: number): Promise<void> {
    await this.prisma.mediaEntity.delete({ where: { id: mediaId } });
  }

  async createFolder(folderName: string): Promise<Folder> {
    const saved = await this.prisma.folderEntity.create({
      data: { name: folderName },
    });

    return this.folderMapperFactory.fromEntity(saved);
  }

  async findFolderByName(folderName: string): Promise<Folder> {
    const folder = await this.prisma.folderEntity.findUnique({
      where: { name: folderName },
    });
    if (!folder) return null;

    return this.folderMapperFactory.fromEntity(folder);
  }

  async deleteFolder(folderName: string): Promise<void> {
    await this.prisma.folderEntity.delete({ where: { name: folderName } });
  }

  async findAll(): Promise<Media[]> {
    const photos = await this.prisma.mediaEntity.findMany({});

    return photos.map((photo) => this.mediaMapperFactory.fromEntity(photo));
  }

  async getAllImagesByFolder(folderId: number): Promise<Media[]> {
    const images = await this.prisma.mediaEntity.findMany({
      where: { folderId },
      include: { folder: true },
    });

    return images.map((image) => this.mediaMapperFactory.fromEntity(image));
  }

  async getImagesForHomePage(): Promise<Media[]> {
    const folder = await this.prisma.folderEntity.findUnique({
      where: { name: 'Home' },
    });

    if (!folder) return null;

    const images = await this.prisma.mediaEntity.findMany({
      where: { folderId: folder.id },
      take: 9,
      orderBy: { id: 'desc' },
    });

    if (!images) return null;

    return images.map((image) => this.mediaMapperFactory.fromEntity(image));
  }

  async getVideoForHomePage(): Promise<Media> {
    const folder = await this.prisma.folderEntity.findUnique({
      where: { name: 'Video' },
    });

    if (!folder) return null;

    const video = await this.prisma.mediaEntity.findFirst({
      where: { folderId: folder.id },
      take: 1,
      orderBy: { id: 'desc' },
    });

    if (!video) return null;

    return this.mediaMapperFactory.fromEntity(video);
  }
}
