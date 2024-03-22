import { Folder } from '../model/folder';
import { Media } from '../model/media';

export interface IGalleryRepository {
  uploadImage(image: Media): Promise<Media>;
  uploadImageForHomePage(image: Media): Promise<Media>;
  uploadVideoForHomePage(video: Media): Promise<Media>;
  findMediaById(mediaId: number): Promise<Media>;
  createFolder(folderName: string): Promise<Folder>;
  deleteFolder(folderName: string): Promise<void>;
  findFolderByName(folderName: string): Promise<Folder>;
  getAllFolders(): Promise<Folder[]>;
  deleteMedia(mediaId: number): Promise<void>;
  findAll(): Promise<Media[]>;
  getAllImagesByFolder(folderId: number): Promise<Media[]>;
  getImagesForHomePage(): Promise<Media[]>;
  getVideoForHomePage(): Promise<Media>;
}
