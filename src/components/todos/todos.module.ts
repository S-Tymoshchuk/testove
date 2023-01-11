import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoEntity } from './entities/todo.entity';
import { SubscribersModule } from '../subscribers/subscribers.module';

@Module({
  imports: [SequelizeModule.forFeature([TodoEntity]), SubscribersModule],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
  exports: [],
})
export class TodosModule {}
