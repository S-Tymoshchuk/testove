import { ApiProperty } from '@nestjs/swagger';

export class GetTodoTesponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  task: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
