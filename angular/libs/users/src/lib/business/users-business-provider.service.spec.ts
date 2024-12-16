import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  ConfigurationService,
  ConfigurationServiceMock,
} from '@patterson-angular/configuration';
import { HttpServiceConfig } from '@patterson-angular/http-service';
import { LoggingService, LoggingServiceMock } from '@patterson-angular/logger';
import { ServiceContext } from '@patterson-angular/types';
import { UsersBusinessProviderService } from './users-business-provider.service';
import { UsersRepositoryService } from './users-repository.service';

describe('UsersBusinessProviderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UsersBusinessProviderService,
        HttpServiceConfig,
        UsersRepositoryService,
        ServiceContext,
        {
          provide: ConfigurationService,
          useClass: ConfigurationServiceMock,
        },
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: UsersBusinessProviderService = TestBed.get(
      UsersBusinessProviderService
    );
    expect(service).toBeTruthy();
  });
});
