import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { CartService } from '@shared/services/cart.service';
import { Product } from '@shared/models/product.model';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;
  const createService = createServiceFactory(CartService);
  const price = 100;
  const mockProduct: Product = {
    id: 1,
    title: 'title',
    price: price,
    description: 'description',
    images: [],
    creationAt: new Date().toISOString(),
    category: {
      id: 0,
      name: '',
      image: '',
      slug: '',
    },
    slug: '',
  };
  beforeEach(() => (spectator = createService()));

  it('should not be logged in', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should not be logged in', () => {
    spectator.service.addToCart(mockProduct);

    expect(spectator.service.cart()).toEqual([mockProduct]);
    expect(spectator.service.total()).toEqual(price);
  });
});
