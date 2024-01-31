import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IImageUploadService } from 'src/application/shared/interfaces/image-upload-service.interface';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from './image-upload.constants';
import { v2, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService implements IImageUploadService {
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

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'Garage Master' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
