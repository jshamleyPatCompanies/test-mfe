import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { User } from '@myMFE/users';
import { LoggingService } from '@patterson-angular/logger';
import { ServiceContext } from '@patterson-angular/types';
import { Users } from '@myMFE/users';
import { RetrieveUserUIService } from './retrieve-user-ui.service';

describe('RetrieveUserUiService', () => {
  // Use the mock data to mock the payload for the specified domain service operation:
  const mockData: User = {
    //TODO: Mock the data for the specified properties of the domain model;
  };

  // Mock the payload for the specified domain service operation;
  const payload = { isSuccess: true, data: mockData };

  // Mock the domain service:
  const mockUsers = {
    retrieveUser: jest.fn().mockReturnValue(of(payload)),
  };
  let uiService: RetrieveUserUIService;
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RetrieveUserUIService,
        { provide: Users, useValue: mockUsers },
      ],
    });
    uiService = TestBed.inject(RetrieveUserUIService);
    service = TestBed.inject(Users);
  });

  it('should be created', () => {
    expect(uiService).toBeTruthy();
  });

  it('should call the domain service', () => {
    // Arrange
    const spy = jest.spyOn(service, 'retrieveUser');
    // Act
    uiService.retrieveUser(mockData.id.toString());
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should call the domain service and return the payload', () => {
    // Arrange
    const spy = jest.spyOn(service, 'retrieveUser');
    // Act
    uiService.retrieveUser(mockData.id.toString());
    // Assert
    expect(spy).toHaveBeenCalled();
    uiService.data$.subscribe((data) => {
      expect(data).toEqual(payload.data);
    });
  });

  it('should call the domain service and set [isSuccess$] to true', () => {
    // Arrange
    const spy = jest.spyOn(service, 'retrieveUser');
    // Act
    uiService.retrieveUser(mockData.id.toString());
    // Assert
    expect(spy).toHaveBeenCalled();
    uiService.isSuccess$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });
});

describe('Handle Service Error', () => {
  // Use the mock data to mock the payload for the specified domain service operation:
  const mockData: User = {
    //TODO: Mock the data for the specified properties of the domain model;
  };

  // Mock the domain service to return an error.
  const mockUsers = {
    retrieveUser: jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Test Error'))),
  };

  const mockLoggingService = {
    log: jest.fn().mockReturnValue(throwError(() => new Error('Test Error'))),
  };
  let uiService: RetrieveUserUIService;
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceContext,
        { provide: Users, useValue: mockUsers },
        { provide: LoggingService, useValue: mockLoggingService },
      ],
    });
    uiService = TestBed.inject(RetrieveUserUIService);
    service = TestBed.inject(Users);
  });

  it('should handle an error from the domain service', () => {
    // Arrange
    const spy = jest
      .spyOn(service, 'retrieveUser')
      .mockReturnValue(throwError(() => new Error('Test Error')));
    // Act
    uiService.retrieveUser(mockData.id.toString());
    // Assert
    expect(spy).toHaveBeenCalled();
    uiService.isError$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });
});
