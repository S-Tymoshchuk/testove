import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  task: string;
}
