import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class NewOrUpdatedDiscountDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
