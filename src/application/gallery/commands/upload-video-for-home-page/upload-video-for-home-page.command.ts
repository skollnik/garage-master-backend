export class UploadVideoForHomePageCommand {
  constructor(public readonly video: Express.Multer.File) {}
}
