export class CreateImageCommand {
  constructor(public readonly file: Express.Multer.File) {}
}
