import { Injectable } from '@nestjs/common';
import { SubscribersRepository } from './subscribers.repository';
import { CreateSubscribeRequest } from './dto/request/create-subscribe-request';
import { SubscribeHttpService } from '../../utils/https/subscribe-http-service';
import { SubscribeEntity } from '../todos/entities/subscribe.entity';
import { EventsEnum } from './enum/events.enum';

@Injectable()
export class SubscribersService {
  constructor(
    private readonly subscribeRepository: SubscribersRepository,
    private readonly subscribeHttpService: SubscribeHttpService,
  ) {}

  createSubscribe(body: CreateSubscribeRequest): Promise<{ success: boolean }> {
    return this.subscribeRepository.createSubscribe(body.url);
  }

  async sendEvent(event: EventsEnum, task: string): Promise<void> {
    const subscribers = await this.getAllSubscribers();

    if (!subscribers.length) {
      return;
    }

    await Promise.all(
      subscribers.map((el) =>
        this.subscribeHttpService.sendEvents(el.url, { task, event }),
      ),
    );
  }

  getAllSubscribers(): Promise<SubscribeEntity[]> {
    return this.subscribeRepository.getAllSubscribers();
  }
}
