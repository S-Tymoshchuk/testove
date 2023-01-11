import { Module } from '@nestjs/common';
import { initAppModules } from './init/app-modules';
import { TodosModule } from './components/todos/todos.module';
import { SubscribersModule } from './components/subscribers/subscribers.module';

@Module({
  imports: [...initAppModules, TodosModule, SubscribersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
