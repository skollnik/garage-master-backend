import { File } from "buffer";

export interface IImageUploadService {
  uploadImage(image: Express.Multer.File): Promise<File | any>;
}
