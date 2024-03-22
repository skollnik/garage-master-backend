export class DeleteVideoCommand {
  constructor(
    public readonly videoId: number,
    public readonly publicId: string,
  ) {}
}
