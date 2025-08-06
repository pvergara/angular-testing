import { Category } from '@shared/models/category.model';
import { faker } from '@faker-js/faker';

export const createFakeCategory = (data?: Partial<Category>): Category => ({
  id: faker.number.int(),
  name: faker.commerce.department(),
  image: faker.image.url(),
  slug: faker.lorem.slug(),
  ...data,
});
