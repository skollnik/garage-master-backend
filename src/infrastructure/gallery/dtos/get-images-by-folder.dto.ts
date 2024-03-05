import { IsNotEmpty, IsString } from 'class-validator';

export class GetImagesByFolderDto {
  @IsNotEmpty()
  @IsString()
  folder: string;
}
