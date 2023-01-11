import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class MarksTodoRequest {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}
