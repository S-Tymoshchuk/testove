import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSubscribeRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  url: string;
}
