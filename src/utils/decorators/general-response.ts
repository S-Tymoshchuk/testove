import { ApiProperty } from '@nestjs/swagger';

export class GeneralResponse {
  @ApiProperty()
  success: boolean;
}
