import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoEntity } from './entities/todo.entity';
import { InjectModel } from '@nestjs/sequelize';
import { MarksTodoRequest } from './dto/request/marks-todo.request';

@Injectable()
export class TodosRepository {
  @InjectModel(TodoEntity)
  private readonly todosModel: typeof TodoEntity;

  getAllTodos(): Promise<TodoEntity[]> {
    return this.todosModel.findAll();
  }
  async createNewTodo(task: string): Promise<{ success: boolean }> {
    await this.todosModel.create({ task });

    return { success: true };
  }

  async marksTodo(todoId: string, body: MarksTodoRequest): Promise<TodoEntity> {
    const todo = await this.todosModel.findOne({ where: { id: todoId } });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todosModel.update({ ...body }, { where: { id: todoId } });

    return todo;
  }
}
