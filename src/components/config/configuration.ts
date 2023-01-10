export interface ServerConfig {
  port: number;
  environment: string;
  baseUrl: string;
}

export interface Sequelize {
  pgHost: string;
  pgUser: string;
  pgPort: string;
  pgBase: string;
  pgPass: string;
}

export interface Swagger {
  docsSwaggerTitle: string;
  docsSwaggerDescription: string;
  docsSwaggerVersion: string;
}

export interface Configuration {
  server: ServerConfig;
  sequelize: Sequelize;
  swagger: Swagger;
}

export default (): Configuration => ({
  server: {
    baseUrl: process.env.BASE_URL,
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT),
  },
  sequelize: {
    pgHost: process.env.PG_HOST,
    pgUser: process.env.PG_USER,
    pgPort: process.env.PG_PORT,
    pgBase: process.env.PG_BASE,
    pgPass: process.env.PG_PASS,
  },
  swagger: {
    docsSwaggerTitle: process.env.DOCS_SWAGGER_TITLE,
    docsSwaggerDescription: process.env.DOCS_SWAGGER_DESCRIPTION,
    docsSwaggerVersion: process.env.DOCS_SWAGGER_VERSION,
  },
});
