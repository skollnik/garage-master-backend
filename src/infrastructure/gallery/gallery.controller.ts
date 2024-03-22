import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFolderCommand } from 'src/application/gallery/commands/create-folder/create-folder.command';
import { UploadImageForHomePageCommand } from 'src/application/gallery/commands/upload-image-for-home-page/upload-image-for-home-page.command';
import { UploadImageCommand } from 'src/application/gallery/commands/upload-image/upload-image.command';
import { UploadVideoForHomePageCommand } from 'src/application/gallery/commands/upload-video-for-home-page/upload-video-for-home-page.command';
import { DeleteImageCommand } from 'src/application/gallery/commands/delete-image/delete-image.command';
import { GetAllFoldersQuery } from 'src/application/gallery/queries/get-all-folders/get-all-folders.query';
import { GetAllImagesQuery } from 'src/application/gallery/queries/get-all-images/get-all-images.query';
import { GetImagesByFolderQuery } from 'src/application/gallery/queries/get-images-by-folder/get-images-by-folder.query';
import { GetImagesForHomePageQuery } from 'src/application/gallery/queries/get-images-for-home-page/get-images-for-home-page.query';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { GetImagesByFolderDto } from './dtos/get-images-by-folder.dto';
import { NewFolderDto } from './dtos/new-folder.dto';
import { FolderPresenter } from './presenters/folder.presenter';
import { ImagePresenter } from './presenters/image.presenter';
import { GetVideoForHomePageQuery } from 'src/application/gallery/queries/get-video-for-home-page/get-video-for-home-page.query';
import { VideoPresenter } from './presenters/video.presenter';
import { DeleteVideoCommand } from 'src/application/gallery/commands/delete-video/delete-video.command';
import { DeleteFolderCommand } from 'src/application/gallery/commands/delete-folder/delete-folder.command';
import { DeleteMediaDto } from './dtos/delete-media.dto';

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

  @UseGuards(JwtGuard)
  @Post('folder')
  async createFolder(@Body() { name }: NewFolderDto) {
    await this.commandBus.execute(new CreateFolderCommand(name));

    return { message: 'Folder created' };
  }

  @Post('images-by-folder')
  async getImagesByFolder(@Body() { folderId }: GetImagesByFolderDto) {
    const images = await this.queryBus.execute(
      new GetImagesByFolderQuery(folderId),
    );

    return images.map((image) => new ImagePresenter(image));
  }

  @UseGuards(JwtGuard)
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
    image: Express.Multer.File,
    @Body('folderId', ParseIntPipe) folderId: number,
    @Body('folderName') folderName: string,
  ) {
    const img = await this.commandBus.execute(
      new UploadImageCommand(image, folderId, folderName),
    );
    return new ImagePresenter(img);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('image-for-home-page')
  async newImageForHomePage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    await this.commandBus.execute(new UploadImageForHomePageCommand(image));
    return { message: 'Image uploaded' };
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('video-for-home-page')
  async newVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'video' }),
        ],
      }),
    )
    video: Express.Multer.File,
  ) {
    await this.commandBus.execute(new UploadVideoForHomePageCommand(video));
    return { message: 'Video uploaded' };
  }

  @UseGuards(JwtGuard)
  @Delete('image')
  async deleteImage(@Body() { id, public_id }: DeleteMediaDto) {
    await this.commandBus.execute(new DeleteImageCommand(id, public_id));
    return { message: 'Image deleted' };
  }

  @Get('images-for-home-page')
  async getImagesForHomePage() {
    const images = await this.queryBus.execute(new GetImagesForHomePageQuery());
    return images.map((image) => new ImagePresenter(image));
  }

  @Get('video-for-home-page')
  async getVideoForHomePage() {
    const video = await this.queryBus.execute(new GetVideoForHomePageQuery());
    return new VideoPresenter(video);
  }

  @UseGuards(JwtGuard)
  @Delete('video')
  async deleteVideo(@Body() { id, public_id }: DeleteMediaDto) {
    await this.commandBus.execute(new DeleteVideoCommand(id, public_id));
    return { message: 'Video deleted' };
  }

  @UseGuards(JwtGuard)
  @Delete('folder')
  async deleteFolder(@Body() { name }: { name: string }) {
    await this.commandBus.execute(new DeleteFolderCommand(name));
    return { message: 'Folder deleted' };
  }
}
