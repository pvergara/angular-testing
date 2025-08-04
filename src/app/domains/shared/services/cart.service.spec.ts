import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { CartService } from '@shared/services/cart.service';
import { Product } from '@shared/models/product.model';
import { createFakeProduct } from '@shared/models/product.mocks';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;
  const createService = createServiceFactory(CartService);
  const price = 100;
  const price2 = 10;
  const mockProduct1: Product = createFakeProduct({ price: price });
  const mockProduct2: Product = createFakeProduct({ price: price2 });

  beforeEach(() => (spectator = createService()));

  it('Service exists', () => {
    expect(spectator.service).toBeDefined();
  });

  it('Service initialized', () => {
    expect(spectator.service.cart()).toEqual([]);
    expect(spectator.service.total()).toEqual(0);
  });

  it('Add to card one product', () => {
    spectator.service.addToCart(mockProduct1);

    expect(spectator.service.cart()).toEqual([mockProduct1]);
    expect(spectator.service.total()).toEqual(price);
  });
  it('Add to card two products', () => {
    spectator.service.addToCart(mockProduct1);
    spectator.service.addToCart(mockProduct2);

    expect(spectator.service.cart()).toEqual([mockProduct1, mockProduct2]);
    expect(spectator.service.total()).toEqual(price + price2);
  });
  it('Add to card to one product with negative price', () => {
    const innerMockProduct = createFakeProduct({ price: -price });
    spectator.service.addToCart(innerMockProduct);

    expect(spectator.service.cart()).toEqual([innerMockProduct]);
    expect(spectator.service.total()).toEqual(-price);
  });
  it('Add to card to one product with floating number price', () => {
    const innerMockProduct = createFakeProduct({ price: price + 0.66 });
    spectator.service.addToCart(innerMockProduct);

    expect(spectator.service.cart()).toEqual([innerMockProduct]);
    expect(spectator.service.total()).toEqual(price + 0.66);
  });
});
