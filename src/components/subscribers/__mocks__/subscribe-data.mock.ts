import { faker } from '@faker-js/faker';
export const subscribeResponse = [
  {
    id: faker.datatype.uuid(),
    url: 'https://www.google.com',
    createdAt: faker.date,
    updatedAt: faker.date,
  },
] as any;
