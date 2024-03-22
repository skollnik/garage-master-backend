export class DeleteImageCommand {
  constructor(
    public readonly imageId: number,
    public readonly publicId: string,
  ) {}
}
