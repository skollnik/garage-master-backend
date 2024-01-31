export class ImagePresenter {
  public readonly id: number;
  public readonly imgUrl: string;

  constructor({ id, imgUrl }) {
    this.id = id;
    this.imgUrl = imgUrl;
  }
}
