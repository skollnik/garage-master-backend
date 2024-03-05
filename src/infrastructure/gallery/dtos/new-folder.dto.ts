import { IsNotEmpty, IsString } from 'class-validator';

export class NewFolderDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
