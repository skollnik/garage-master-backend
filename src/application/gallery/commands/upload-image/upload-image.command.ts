export class UploadImageCommand {
  constructor(
    public readonly image: Express.Multer.File,
    public readonly folderId: number,
    public readonly folderName: string,
  ) {}
}
