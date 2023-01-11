import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscribeEntity } from '../todos/entities/subscribe.entity';

@Injectable()
export class SubscribersRepository {
  constructor(
    @InjectModel(SubscribeEntity)
    private readonly subscribeModel: typeof SubscribeEntity,
  ) {}

  async createSubscribe(url: string): Promise<{ success: boolean }> {
    const createSubscribe = await this.subscribeModel.create({ url });

    if (createSubscribe) return { success: true };

    return { success: false };
  }

  getAllSubscribers(): Promise<SubscribeEntity[]> {
    return this.subscribeModel.findAll();
  }
}
