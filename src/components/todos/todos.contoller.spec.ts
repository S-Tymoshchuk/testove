import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createTodoMock,
  randomId,
  todoResponse,
} from './__mocks__/todo-data.mock';

describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useFactory: (): Partial<TodosService> => ({
            getAllTodos: jest.fn().mockResolvedValueOnce(todoResponse),
            createNewTodo: jest.fn().mockResolvedValueOnce({ success: true }),
            marksTodo: jest.fn().mockResolvedValueOnce({ success: true }),
          }),
        },
      ],
    }).compile();

    todosController = moduleRef.get<TodosController>(TodosController);
    todosService = moduleRef.get<TodosService>(TodosService);
  });

  it('should return a list todo', async () => {
    const result = await todosController.getAllTodos();

    expect(result).toEqual(todoResponse);
    expect(todosService.getAllTodos).toHaveBeenCalled();
  });

  it('should call with body', async () => {
    const result = await todosController.createNewTodo(createTodoMock);

    expect(result).toEqual({ success: true });
    expect(todosService.createNewTodo).toHaveBeenCalledWith(createTodoMock);
  });

  it('should complete todo', async () => {
    const result = await todosController.marksTodo(
      { id: randomId },
      { completed: true },
    );

    expect(result).toEqual({ success: true });

    expect(todosService.marksTodo).toHaveBeenCalledWith(randomId, {
      completed: true,
    });
    expect(todosService.marksTodo).toHaveBeenCalled();
  });
});
