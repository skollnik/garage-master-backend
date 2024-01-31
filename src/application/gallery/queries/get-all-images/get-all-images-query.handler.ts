import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllImagesQuery } from "./get-all-images.query";
import { IImageRepository } from "src/domain/image/interfaces/image-repository.interface";
import { Inject } from "@nestjs/common";
import { IMAGE_REPOSITORY } from "../../image.constants";

@QueryHandler(GetAllImagesQuery)
export class GetAllImagesQueryHandler
  implements IQueryHandler<GetAllImagesQuery>
{
  constructor(
    @Inject(IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}

  async execute(): Promise<any> {
    const image = await this.imageRepository.findAll();
    return image;
  }
}