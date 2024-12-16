import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoggingService, LoggingServiceMock } from '@patterson-angular/logger';
import {
  HttpService,
  HttpServiceConfig,
} from '@patterson-angular/http-service';
import { ServiceContext } from '@patterson-angular/types';
import { UsersService } from './users.service';
import { UsersBusinessProviderService } from './business/users-business-provider.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpServiceConfig,
        UsersBusinessProviderService,
        LoggingServiceMock,
        ServiceContext,
        HttpService,
        {
          provide: LoggingService,
          useClass: LoggingServiceMock,
        },
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
