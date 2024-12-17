import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Users } from '@myMFE/users';
import { User } from '@myMFE/users';
import { CreateUserUIService } from './create-user-ui.service';

describe('CreateUserUIService', () => {
  // Mock Data: Implement the properties of the specified domain model;
  const mockData: User = {
    //TODO: IMPLEMENT THE PROPERTIES OF THE SPECIFIED DOMAIN MODEL;
  };

  // Mock the payload for the specified domain service operation;
  const payload = { isSuccess: true, data: mockData };

  // Mock the domain service:
  const mockUsers = {
    createUser: jest.fn().mockReturnValue(of(payload)),
  };

  let uiService: CreateUserUIService;
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUserUIService, { provide: Users, useValue: mockUsers }],
    });

    uiService = TestBed.inject(CreateUserUIService);
    service = TestBed.inject(Users);
  });

  it('should be created', () => {
    expect(uiService).toBeTruthy();
  });

  it('should call the domain service', () => {
    const spy = jest.spyOn(service, 'createUser');
    uiService.createUser(mockData);
    expect(spy).toHaveBeenCalled();
  });

  it('should call the domain service and set [isSuccess$] to true', () => {
    uiService.createUser(mockData);

    expect(service.createUser).toHaveBeenCalled();
    uiService.isSuccess$.subscribe((data) => {
      expect(data).toEqual(true);
    });
  });
});
