export class UploadImageForHomePageCommand {
  constructor(public readonly image: Express.Multer.File) {}
}
