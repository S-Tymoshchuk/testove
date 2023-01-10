import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Initializer } from './init/initializer';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('bootstrap');

  const configService = app.get(ConfigService);

  const initializer = new Initializer(app, configService);

  app.useLogger(logger);

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('api');

  initializer.run();

  const PORT = process.env.PORT || 8000;

  await app.listen(PORT);

  logger.log(`App is listening on port ${PORT}`);
}
bootstrap();
