import { AggregateRoot } from '@nestjs/cqrs';
import { MediaNotFoundException } from '../exceptions/media-not-found.exception';

export class Media extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly public_id: string,
    public readonly url: string,
    public readonly folderId: number,
  ) {
    super();
  }

  static throwIfNull(media: Media) {
    if (!media) throw new MediaNotFoundException();
  }

  static create({ id, public_id, url, folderId }: Partial<Media>) {
    return new Media(id, public_id, url, folderId);
  }
}
