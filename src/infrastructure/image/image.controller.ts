import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ImagePresenter } from './presenters/image.presenter';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAllImagesQuery } from 'src/application/image/queries/get-all-images/get-all-images.query';
import { CreateImageCommand } from 'src/application/image/commands/create-image/create-image.command';

@Controller('image')
export class ImageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll() {
    const images = await this.queryBus.execute(new GetAllImagesQuery());
    return images.map((image) => new ImagePresenter(image));
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async newImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const image = await this.commandBus.execute(new CreateImageCommand(file));

    return new ImagePresenter(image);
  }
}
