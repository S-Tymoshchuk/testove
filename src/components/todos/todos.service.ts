import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { TodoEntity } from './entities/todo.entity';
import { MarksTodoRequest } from './dto/request/marks-todo.request';
import { SubscribersService } from '../subscribers/subscribers.service';
import { EventsEnum } from '../subscribers/enum/events.enum';
import { CreateTodoRequest } from './dto/request/create-todo.request';

@Injectable()
export class TodosService {
  constructor(
    private readonly todosRepository: TodosRepository,
    private readonly subscribersService: SubscribersService,
  ) {}

  getAllTodos(): Promise<TodoEntity[]> {
    return this.todosRepository.getAllTodos();
  }
  async createNewTodo(body: CreateTodoRequest): Promise<{ success: boolean }> {
    const { task } = body;

    await this.todosRepository.createNewTodo(task);

    await this.subscribersService.sendEvent(EventsEnum.TODO_ADDED, task);

    return { success: true };
  }

  async marksTodo(
    todoId: string,
    body: MarksTodoRequest,
  ): Promise<{ success: boolean }> {
    const result = await this.todosRepository.marksTodo(todoId, body);

    await this.subscribersService.sendEvent(
      EventsEnum.TODO_COMPLETED,
      result.task,
    );

    return { success: true };
  }
}
