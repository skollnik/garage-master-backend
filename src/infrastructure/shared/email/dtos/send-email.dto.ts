import { IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  from?: string;

  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  html: string;
}
