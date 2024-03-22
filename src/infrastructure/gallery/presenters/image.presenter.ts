export class ImagePresenter {
  public readonly id: number;
  public readonly public_id: string;
  public readonly url: string;

  constructor({ id, public_id, url }: Partial<ImagePresenter>) {
    this.id = id;
    this.public_id = public_id;
    this.url = url;
  }
}
