import { Product } from '@shared/models/product.model';
import { faker } from '@faker-js/faker';

export const createFakeProduct = (data?: Partial<Product>): Product => ({
  id: faker.number.int(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  images: [faker.image.url(), faker.image.url()],
  slug: faker.lorem.slug(),
  category: {
    id: faker.number.int(),
    name: faker.commerce.department(),
    image: faker.image.url(),
    slug: faker.lorem.slug(),
  },
  creationAt: new Date().toISOString(),
  ...data,
});
