import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NewServiceTypeDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
