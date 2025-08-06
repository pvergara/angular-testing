import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { ProductService } from '@shared/services/product.service';
import { environment } from '@env/environment';

describe('ProductService', () => {
  let spectator: SpectatorHttp<ProductService>;
  const createHttp = createHttpFactory(ProductService);

  beforeEach(() => {
    spectator = createHttp();
  });

  it('can test HttpClient.get', () => {
    const id = '1';
    spectator.service.getOne(id).subscribe();
    spectator.expectOne(
      `${environment.apiUrl}/api/v1/products/${id}`,
      HttpMethod.GET
    );
  });
});
