import { Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import configuration from '../components/config/configuration';
import { TodoEntity } from '../components/todos/entities/todo.entity';
import { SubscribeEntity } from '../components/todos/entities/subscribe.entity';

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),

  SequelizeModule.forRoot({
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_BASE,
    host: '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT),
    dialect: 'mysql',
    define: {
      timestamps: true,
      underscored: true,
    },
    logging: (message) => {
      Logger.debug(message);
    },
    synchronize: true,
    autoLoadModels: true,
    models: [TodoEntity, SubscribeEntity],
  }),
];
