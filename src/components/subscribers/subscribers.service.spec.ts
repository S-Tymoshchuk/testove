import { SubscribersRepository } from './subscribers.repository';
import { SubscribeHttpService } from '../../utils/https/subscribe-http-service';
import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersService } from './subscribers.service';
import { subscribeResponse } from './__mocks__/subscribe-data.mock';
import { EventsEnum } from './enum/events.enum';
import { createTodoMock } from '../todos/__mocks__/todo-data.mock';

describe('SubscribersService', () => {
  let subscribersService: SubscribersService;
  let subscribeRepository: SubscribersRepository;
  let subscribeHttpService: SubscribeHttpService;

  beforeEach(async () => {
    const modulRef: TestingModule = await Test.createTestingModule({
      providers: [
        SubscribersService,
        {
          provide: SubscribersRepository,
          useFactory: (): Partial<SubscribersRepository> => ({
            createSubscribe: jest.fn(),
            getAllSubscribers: jest.fn(),
          }),
        },
        {
          provide: SubscribeHttpService,
          useFactory: (): Partial<SubscribeHttpService> => ({
            sendEvents: jest.fn(),
          }),
        },
      ],
    }).compile();

    subscribersService = await modulRef.get<SubscribersService>(
      SubscribersService,
    );
    subscribeRepository = await modulRef.get<SubscribersRepository>(
      SubscribersRepository,
    );
    subscribeHttpService =
      modulRef.get<SubscribeHttpService>(SubscribeHttpService);
  });

  it('should create subscribe', async () => {
    const link = {
      url: 'https://www.google.com',
    };

    await subscribersService.createSubscribe(link);
    expect(subscribeRepository.createSubscribe).toHaveBeenCalledWith(link.url);
  });

  it('should no send events', async () => {
    subscribeRepository.getAllSubscribers = jest.fn().mockResolvedValue([]);

    const result = await subscribersService.sendEvent(
      EventsEnum.TODO_COMPLETED,
      createTodoMock.task,
    );

    expect(result).toBeUndefined();
    expect(subscribeHttpService.sendEvents).not.toHaveBeenCalled();
  });

  it('should send events', async () => {
    subscribeRepository.getAllSubscribers = jest
      .fn()
      .mockResolvedValue(subscribeResponse);

    await subscribersService.sendEvent(
      EventsEnum.TODO_COMPLETED,
      createTodoMock.task,
    );

    expect(subscribeHttpService.sendEvents).toHaveBeenCalledWith(
      subscribeResponse[0].url,
      { task: createTodoMock.task, event: EventsEnum.TODO_COMPLETED },
    );
  });
});
