import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteMediaDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  public_id: string;
}
