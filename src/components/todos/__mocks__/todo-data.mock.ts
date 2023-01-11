import { faker } from '@faker-js/faker';
import { TodoEntity } from '../entities/todo.entity';
export const todoResponse = [
  {
    id: faker.datatype.uuid(),
    completed: false,
    task: faker.random.word(),
    createdAt: faker.date,
    updatedAt: faker.date,
  },
] as TodoEntity[];

export const createTodoMock = {
  task: faker.random.word(),
};

export const randomId = faker.datatype.uuid();
