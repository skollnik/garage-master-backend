export class FolderPresenter {
  public readonly id: number;
  public readonly name: string;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}
