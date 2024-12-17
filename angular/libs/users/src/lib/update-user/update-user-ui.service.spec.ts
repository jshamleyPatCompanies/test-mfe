import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { User } from '@myMFE/users';
import { LoggingService } from '@patterson-angular/logger';
import { ServiceContext } from '@patterson-angular/types';
import { Users } from '@myMFE/users';
import { UpdateUserUIService } from './update-user-ui.service';

describe('UpdateUserUiService', () => {
  // Use the mock data to mock the payload for the specified domain service operation:
  const mockData: User = {
    //TODO: Mock the data for the specified properties of the domain model;
  };

  // Mock the payload for the specified domain service operation:
  const payload = { isSuccess: true, data: mockData };

  // Mock the domain service:
  const mockUsers = {
    retrieveUser: jest.fn().mockReturnValue(of(payload)),
    updateUser: jest.fn().mockReturnValue(of(payload)),
  };
  let uiService: UpdateUserUIService;
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateUserUIService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: mockData.id }) },
        },
        { provide: Users, useValue: mockUsers },
      ],
    });
    uiService = TestBed.inject(UpdateUserUIService);
    service = TestBed.inject(Users);
  });

  it('should be created', () => {
    expect(uiService).toBeTruthy();
  });

  // Retrieve User by ID happy path Tests:
  it('should call the domain service', () => {
    uiService.retrieveUser('1');
    expect(service.retrieveUser).toHaveBeenCalled();
  });

  it('should call the domain service and return the payload', () => {
    uiService.retrieveUser('1');

    expect(service.retrieveUser).toHaveBeenCalled();
    uiService.data$.subscribe((data) => {
      expect(data).toEqual(payload.data);
    });
  });

  it('should call the domain service and set [isSuccess$] to true', () => {
    uiService.retrieveUser('1');

    expect(service.retrieveUser).toHaveBeenCalled();
    uiService.isSuccess$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  // Update User happy path Tests:
  it('should call the domain service', () => {
    uiService.updateUser(mockData);
    expect(service.updateUser).toHaveBeenCalled();
  });

  it('should call the domain service and return the payload', () => {
    uiService.updateUser(mockData);

    expect(service.updateUser).toHaveBeenCalled();
    uiService.data$.subscribe((data) => {
      expect(data).toEqual(payload.data);
    });
  });

  it('should call the domain service and set [isSuccess$] to true', () => {
    uiService.updateUser(mockData);

    expect(service.updateUser).toHaveBeenCalled();
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
    updateUser: jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Test Error'))),
  };

  const mockLoggingService = {
    log: jest.fn().mockReturnValue(throwError(() => new Error('Test Error'))),
  };
  let uiService: UpdateUserUIService;
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceContext,
        { provide: Users, useValue: mockUsers },
        { provide: LoggingService, useValue: mockLoggingService },
      ],
    });
    uiService = TestBed.inject(UpdateUserUIService);
    service = TestBed.inject(Users);
  });

  // Error retrieving User by ID Test:
  it('should handle an error from the domain service', () => {
    const spy = jest
      .spyOn(service, 'retrieveUser')
      .mockReturnValue(throwError(() => new Error('Test Error')));
    uiService.retrieveUser('1');
    expect(spy).toHaveBeenCalled();
    uiService.isError$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  // Error updating User Test:
  it('should handle an error from the domain service', () => {
    const spy = jest
      .spyOn(service, 'updateUser')
      .mockReturnValue(throwError(() => new Error('Test Error')));
    uiService.updateUser(mockData);
    expect(spy).toHaveBeenCalled();
    uiService.isError$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });
});
