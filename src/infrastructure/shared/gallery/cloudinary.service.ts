import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { IGalleryService } from 'src/application/shared/interfaces/gallery-service.interface';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from './cloudinary.constants';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService implements IGalleryService {
  constructor(private readonly configService: ConfigService) {
    const cloudName = configService.get(CLOUDINARY_CLOUD_NAME);
    const apiKey = configService.get(CLOUDINARY_API_KEY);
    const apiSecret = configService.get(CLOUDINARY_API_SECRET);

    v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadVideo(
    video: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'Video', resource_type: 'video' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(video.buffer).pipe(upload);
    });
  }

  async uploadImage(
    image: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: `Garage Master/${folder}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(image.buffer).pipe(upload);
    });
  }

  async uploadImageForHomePage(
    image: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'Home' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(image.buffer).pipe(upload);
    });
  }

  async getImagesForHomePage(): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.api.resources({ type: 'upload', prefix: 'Home' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async getVideoForHomePage(): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.api.resources(
        { type: 'upload', prefix: 'Video', resource_type: 'video' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  async deleteImageFromHomePage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async deleteVideoFromHomePage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(
        publicId,
        { resource_type: 'video' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(
        publicId,
        { resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  async createFolder(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.api.create_folder(`Garage Master/${name}`, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async getFolders(): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.api.sub_folders('Garage Master', (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async getAllImagesByFolder(folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.api.resources(
        { type: 'upload', prefix: `Garage Master/${folder}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  async deleteFolder(folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.api.delete_folder(`Garage Master/${folder}`, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
