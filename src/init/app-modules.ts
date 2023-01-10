import { Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import configuration from '../components/config/configuration';

export const initAppModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),

  SequelizeModule.forRoot({
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_BASE,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
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
    models: [],
  }),
];
