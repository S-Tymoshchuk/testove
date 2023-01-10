import { Module } from '@nestjs/common';
import { initAppModules } from './init/app-modules';

@Module({
  imports: [...initAppModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
