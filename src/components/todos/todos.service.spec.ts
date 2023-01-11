import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersService } from '../subscribers/subscribers.service';
import {
  createTodoMock,
  randomId,
  todoResponse,
} from './__mocks__/todo-data.mock';
import { EventsEnum } from '../subscribers/enum/events.enum';

describe('TodoService', () => {
  let todosService: TodosService;
  let todosRepository: TodosRepository;
  let subscribersService: SubscribersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TodosRepository,
          useFactory: (): Partial<TodosRepository> => ({
            getAllTodos: jest.fn(),
            createNewTodo: jest.fn(),
            marksTodo: jest.fn().mockResolvedValueOnce(todoResponse[0]),
          }),
        },
        {
          provide: SubscribersService,
          useFactory: (): Partial<SubscribersService> => ({
            sendEvent: jest.fn(),
          }),
        },
      ],
    }).compile();

    todosService = moduleRef.get<TodosService>(TodosService);
    todosRepository = moduleRef.get<TodosRepository>(TodosRepository);
    subscribersService = moduleRef.get<SubscribersService>(SubscribersService);
  });

  it('should return a list todo and call func', async () => {
    jest.spyOn(todosRepository, 'getAllTodos').mockResolvedValue(todoResponse);

    const result = await todosService.getAllTodos();

    expect(todosRepository.getAllTodos).toHaveBeenCalled();
    expect(result).toEqual(todoResponse);
  });

  it('should create new task and call event', async () => {
    const newTask = createTodoMock;
    await todosService.createNewTodo(newTask);

    expect(todosRepository.createNewTodo).toHaveBeenCalledWith(newTask.task);
    expect(subscribersService.sendEvent).toHaveBeenCalledWith(
      EventsEnum.TODO_ADDED,
      newTask.task,
    );
  });

  it('should make task and call event', async () => {
    await todosService.marksTodo(randomId, { completed: true });

    expect(todosRepository.marksTodo).toHaveBeenCalledWith(randomId, {
      completed: true,
    });
    expect(subscribersService.sendEvent).toHaveBeenCalledWith(
      EventsEnum.TODO_COMPLETED,
      todoResponse[0].task,
    );
  });
});
