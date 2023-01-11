import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SubscribersController', () => {
  let subscribersController: SubscribersController;
  let subscribersService: SubscribersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SubscribersController],
      providers: [
        {
          provide: SubscribersService,
          useFactory: (): Partial<SubscribersService> => ({
            createSubscribe: jest.fn().mockResolvedValueOnce({ success: true }),
          }),
        },
      ],
    }).compile();

    subscribersController = await moduleRef.get<SubscribersController>(
      SubscribersController,
    );
    subscribersService = await moduleRef.get<SubscribersService>(
      SubscribersService,
    );
  });

  it('should create subscribe', async () => {
    const url = 'https://www.google.com';
    const result = await subscribersController.createSubscribe({
      url,
    });

    expect(subscribersService.createSubscribe).toHaveBeenCalledWith({
      url,
    });
    expect(result).toEqual({ success: true });
  });
});
