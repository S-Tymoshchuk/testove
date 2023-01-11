import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TODOS_PATH } from '../../docs/path';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TODOS_TAG } from '../../docs/tags';
import { CreateTodoRequest } from './dto/request/create-todo.request';
import { TodoEntity } from './entities/todo.entity';
import { ParamId } from '../../utils/decorators/param-id-decorator';
import { MarksTodoRequest } from './dto/request/marks-todo.request';
import { GetTodoTesponse } from './dto/response/get-todo-tesponse';
import { GeneralResponse } from '../../utils/decorators/general-response';

@ApiTags(TODOS_TAG)
@Controller(TODOS_PATH)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOkResponse({ type: GetTodoTesponse, isArray: true })
  @Get()
  getAllTodos(): Promise<TodoEntity[]> {
    return this.todosService.getAllTodos();
  }

  @ApiOkResponse({ type: GeneralResponse })
  @Post()
  createNewTodo(
    @Body() body: CreateTodoRequest,
  ): Promise<{ success: boolean }> {
    return this.todosService.createNewTodo(body);
  }

  @ApiOkResponse({ type: GeneralResponse })
  @Patch(':id')
  marksTodo(@Param() param: ParamId, @Body() body: MarksTodoRequest) {
    return this.todosService.marksTodo(param.id, body);
  }
}
