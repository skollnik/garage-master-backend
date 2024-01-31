import { IsNotEmpty } from 'class-validator';

export class NewImageDto {
  @IsNotEmpty()
  imgUrl: string;
}
