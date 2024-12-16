import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  ConfigurationService,
  ConfigurationServiceMock,
} from '@patterson-angular/configuration';
import { HttpServiceConfig } from '@patterson-angular/http-service';
import { LoggingService, LoggingServiceMock } from '@patterson-angular/logger';
import { UsersRepositoryService } from './users-repository.service';

describe('UsersRepositoryService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        HttpServiceConfig,
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
    const service: UsersRepositoryService = TestBed.get(UsersRepositoryService);
    expect(service).toBeTruthy();
  });
});
