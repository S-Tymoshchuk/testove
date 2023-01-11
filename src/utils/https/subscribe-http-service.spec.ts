import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeHttpService } from './subscribe-http-service';
import { HttpService } from '@nestjs/axios';
import { subscribeResponse } from '../../components/subscribers/__mocks__/subscribe-data.mock';
import { createTodoMock } from '../../components/todos/__mocks__/todo-data.mock';
import { EventsEnum } from '../../components/subscribers/enum/events.enum';
import { BadRequestException } from '@nestjs/common';

const mockHttpService = (): any => ({
  post: jest.fn(),
});

describe('SubscribersService', () => {
  let subscribeHttpService: SubscribeHttpService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SubscribeHttpService,
        {
          provide: HttpService,
          useFactory: mockHttpService,
        },
      ],
    }).compile();

    subscribeHttpService = await moduleRef.get<SubscribeHttpService>(
      SubscribeHttpService,
    );
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('should error with invalid url', async () => {
    await expect(
      subscribeHttpService.sendEvents(subscribeResponse[0].url, {
        task: createTodoMock.task,
        event: EventsEnum.TODO_COMPLETED,
      }),
    ).rejects.toThrow(BadRequestException);

    expect(httpService.post).toHaveBeenCalled();
  });
});
