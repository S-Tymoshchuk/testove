import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscribeEntity } from '../todos/entities/subscribe.entity';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { SubscribersRepository } from './subscribers.repository';
import { HttpModule } from '@nestjs/axios';
import { SubscribeHttpService } from '../../utils/https/subscribe-http-service';

@Module({
  imports: [SequelizeModule.forFeature([SubscribeEntity]), HttpModule],
  controllers: [SubscribersController],
  providers: [SubscribersService, SubscribersRepository, SubscribeHttpService],
  exports: [SubscribersService],
})
export class SubscribersModule {}
