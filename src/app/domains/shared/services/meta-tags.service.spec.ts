import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MetaTagsService } from '@shared/services/meta-tags.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@env/environment';

describe('AuthService', () => {
  let spectator: SpectatorService<MetaTagsService>;
  let metaPlatform: Meta;
  let titlePlatform: Title;
  const createService = createServiceFactory({
    service: MetaTagsService,
    providers: [
      {
        provide: Title,
        useValue: {
          setTitle: jest.fn(),
        },
      },
      {
        provide: Meta,
        useValue: {
          updateTag: jest.fn(),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    metaPlatform = spectator.inject(Meta);
    titlePlatform = spectator.inject(Title);
    jest.clearAllMocks();
  });

  it('should not be logged in', () => {
    expect(spectator.service).toBeDefined();
    expect(spectator.service).toBeTruthy();
    expect(spectator.service).toBeTruthy();
  });

  it('should be able to update meta tags', () => {
    const title = 'Test title';
    spectator.service.updateMetaTags({
      title: title,
      description: 'Test description',
      image: 'image.png',
      url: 'url',
    });

    expect(metaPlatform.updateTag).toHaveBeenCalledTimes(6);
    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      name: 'title',
      content: title,
    });
    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      property: 'og:title',
      content: title,
    });

    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      property: 'og:description',
      content: 'Test description',
    });
    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      property: 'og:image',
      content: 'image.png',
    });
    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: 'url',
    });

    expect(titlePlatform.setTitle).toHaveBeenCalledTimes(1);
  });
  it('what if I do not send url?', () => {
    const title = 'Test title';
    spectator.service.updateMetaTags({
      title: title,
      description: 'Test description',
      image: 'image.png',
    });

    expect(metaPlatform.updateTag).toHaveBeenCalledWith({
      property: 'og:url',
      content: environment.domain,
    });

    expect(titlePlatform.setTitle).toHaveBeenCalledTimes(1);
  });
});
