import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetImagesByFolderDto {
  @IsNotEmpty()
  @IsNumber()
  folderId: number;
}
