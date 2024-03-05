import { File } from 'buffer';

export interface IGalleryService {
  uploadImage(image: Express.Multer.File, folder: string): Promise<File | any>;
  createFolder(name: string): Promise<any>;
  getFolders(): Promise<any>;
  getAllImagesByFolder(folder: string): Promise<any>;
}
