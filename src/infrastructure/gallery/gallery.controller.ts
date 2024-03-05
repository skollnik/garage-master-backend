import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFolderCommand } from 'src/application/gallery/commands/create-folder/create-folder.command';
import { CreateImageCommand } from 'src/application/gallery/commands/create-image/create-image.command';
import { GetAllFoldersQuery } from 'src/application/gallery/queries/get-all-folders/get-all-folders.query';
import { GetAllImagesQuery } from 'src/application/gallery/queries/get-all-images/get-all-images.query';
import { GetImagesByFolderQuery } from 'src/application/gallery/queries/get-images-by-folder/get-images-by-folder.query';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { NewFolderDto } from './dtos/new-folder.dto';
import { FolderPresenter } from './presenters/folder.presenter';
import { ImagePresenter } from './presenters/image.presenter';
import { GetImagesByFolderDto } from './dtos/get-images-by-folder.dto';

@Controller('gallery')
@UseFilters(DomainErrorFilter)
export class GalleryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAll() {
    const images = await this.queryBus.execute(new GetAllImagesQuery());
    return images.map((image) => new ImagePresenter(image));
  }

  @Get('folder')
  async getFolders() {
    const folders = await this.queryBus.execute(new GetAllFoldersQuery());

    return folders.map((folder) => new FolderPresenter(folder));
  }

  @Post('folder')
  async createFolder(@Body() { name }: NewFolderDto) {
    await this.commandBus.execute(new CreateFolderCommand(name));

    return { message: 'Folder created' };
  }

  @Post('images-by-folder')
  async getImagesByFolder(@Body() { folder }: GetImagesByFolderDto) {
    const images = await this.queryBus.execute(
      new GetImagesByFolderQuery(folder),
    );

    return images.map((image) => new ImagePresenter({ imgUrl: image.url }));
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async newImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() { folder }: { folder: string },
  ) {
    const image = await this.commandBus.execute(
      new CreateImageCommand(file, folder),
    );
    return new ImagePresenter(image);
  }
}
