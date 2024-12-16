import { TestBed } from '@angular/core/testing';
import { Users } from '@myMFE/users';
import { LoggingService } from '@patterson-angular/logger';
import { ApiResponse, ServiceContext } from '@patterson-angular/types';

import { of, throwError } from 'rxjs';
import { RetrieveUserListUIService } from './retrieve-user-list-ui.service';
import { User } from '@myMFE/Users';

describe('RetrieveUserListUIService', () => {
  // Use the mock data to mock the api response for the specified domain service operation
  //TODO: Mock the payload for the specified domain service operation
  const user1: User = {};
  const user2: User = {};
  // Mock the list of domain models
  const users: User[] = [user1, user2];

  // Mock the api response for the specified domain service operation

  const apiResponseMock: ApiResponse<Enterprise[]> = {
    isSuccess: true,
    message: '',
    messages: [],
    id: '1',
    timestamp: new Date(Date.now()),
    data: mockData,
  };

  // Mock Domain Service and UI Service
  const mockUsers = {
    retrieveUserList: jest.fn().mockReturnValue(of(apiResponseMock)),
  };
  let uiService: RetrieveUserListUIService;
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RetrieveUserListUIService,
        { provide: Users, useValue: mockUsers },
      ],
    });
    uiService = TestBed.inject(RetrieveUserListUIService);
    service = TestBed.inject(Users);
  });

  it('should be created', () => {
    expect(uiService).toBeTruthy();
  });

  it('should call the domain service', () => {
    // Arrange
    const spy = jest.spyOn(service, 'retrieveUserList');
    // Act
    service.retrieveEnterpriseList();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should call the domain service and return the payload', () => {
    // Arrange
    const spy = jest
      .spyOn(service, 'retrieveUserList')
      .mockReturnValue(of(apiResponseMock));
    // Act
    service.retrieveEnterpriseList();
    // Assert
    expect(spy).toHaveBeenCalled();
    uiService.data$.subscribe((data) => {
      expect(data).toEqual(apiResponseMock.data);
    });
  });

  it('should call the domain service and set [isSuccess$] to true', () => {
    // Arrange
    const spy = jest
      .spyOn(service, 'retrieveUserList')
      .mockReturnValue(of(apiResponseMock));
    // Act
    service.retrieveEnterpriseList();
    // Assert
    expect(spy).toHaveBeenCalled();
    uiService.isSuccess$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });
});

describe('Handle Service Error', () => {
  // Mock the domain service to return an error.
  const mockUsers = {
    retrieveUserList: jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Test Error'))),
  };

  const mockLoggingService = {
    log: jest.fn().mockReturnValue(throwError(() => new Error('Test Error'))),
  };
  let uiService: RetrieveUserListUIService;
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceContext,
        { provide: Users, useValue: mockUsers },
        { provide: LoggingService, useValue: mockLoggingService },
      ],
    });
    uiService = TestBed.inject(RetrieveUserListUIService);
    service = TestBed.inject(Users);
  });

  it('should handle an error from the domain service', () => {
    // Arrange
    const spy = jest
      .spyOn(service, 'retrieveUserList')
      .mockReturnValue(throwError(() => new Error('Test Error')));
    // Act

    service.retrieveEnterpriseList();
    // Assert
    expect(spy).toHaveBeenCalled();
    uiService.isError$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });
});
