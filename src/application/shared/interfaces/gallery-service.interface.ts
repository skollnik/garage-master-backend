import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export interface IGalleryService {
  uploadVideo(
    video: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse>;
  uploadImage(
    image: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse>;
  uploadImageForHomePage(
    image: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse>;
  getImagesForHomePage(): Promise<any>;
  getVideoForHomePage(): Promise<any>;
  deleteImageFromHomePage(publicId: string): Promise<any>;
  deleteVideoFromHomePage(publicId: string): Promise<any>;
  deleteImage(publicId: string): Promise<any>;
  createFolder(name: string): Promise<any>;
  getFolders(): Promise<any>;
  getAllImagesByFolder(folder: string): Promise<any>;
  deleteFolder(name: string): Promise<any>;
}
