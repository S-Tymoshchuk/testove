## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Env

```bash
$ add .env to the root of the project
```

## Run db local

```bash
$ docker compose up -d
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Swagger
```
You can also see all the endpoints in the swagger.
local: http://localhost:8000/api/docs#/   after starting the application.
staging: http://ec2-34-244-192-152.eu-west-1.compute.amazonaws.com/api/docs#/
```

## Deploy

```
I set up automatic deploy using ci/cd github actions. When you make an update in the master push or pull request branch.
The github actions are launched and the update is done automatically
```
