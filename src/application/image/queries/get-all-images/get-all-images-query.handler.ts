import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IImageRepository } from "src/domain/image/interfaces/image-repository.interface";
import { IMAGE_REPOSITORY } from "../../image.constants";
import { GetAllImagesQuery } from "./get-all-images.query";

@QueryHandler(GetAllImagesQuery)
export class GetAllImagesQueryHandler
  implements IQueryHandler<GetAllImagesQuery>
{
  constructor(
    @Inject(IMAGE_REPOSITORY)
    private readonly imageRepository: IImageRepository,
  ) {}

  async execute(): Promise<any> {
    const images = await this.imageRepository.findAll();
    return images;
  }
}