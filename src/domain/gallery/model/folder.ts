import { AggregateRoot } from '@nestjs/cqrs';
import { Media } from './media';
import { FolderNotFoundException } from '../exceptions/folder-not-found.exceptionts';

export class Folder extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly media: Media[] = [],
  ) {
    super();
  }

  static throwIfNull(folder: Folder) {
    if (!folder) throw new FolderNotFoundException();
  }

  static create({ id, name, media }: Partial<Folder>) {
    return new Folder(id, name, media);
  }
}
