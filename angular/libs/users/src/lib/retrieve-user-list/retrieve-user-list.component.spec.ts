import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoggingService } from '@patterson-angular/logger';
import { Users } from '@myMFE/users';
import { User } from '@myMFE/Users';
import { RetrieveUserListComponent } from './retrieve-user-list.component';
import { RetrieveUserListUIService } from './retrieve-user-list-ui.service';

describe('RetrieveUserListComponent', () => {
  // Mock Data: Implement the properties of the specified domain model
  //TODO: Mock the payload for the specified domain service operation
  const user1: User = {};
  const user2: User = {};
  // Mock the list of domain models
  const mockData: User[] = [user1, user2];

  // Mock Domain Service and UI Service
  const mockUsers = {
    retrieveUserList: jest
      .fn()
      .mockReturnValue(of({ isSuccess: true, data: mockData })),
  };

  const mockUIService = {
    initialize: jest.fn(),
    retrieveUserList: jest.fn(),
    data$: of(mockData), // Mock Observable
    isError$: of(false), // Mock Observable
    isLoading$: of(false), // Mock Observable
    isSuccess$: of(true), // Mock Observable
  };

  let component: RetrieveUserListComponent;
  let fixture: ComponentFixture<RetrieveUserListComponent>;
  let loggingService: LoggingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: RetrieveUserListUIService, useValue: mockUIService },
        { provide: Users, useValue: mockUsers },
      ],
      declarations: [RetrieveUserListComponent],
      // Include this to prevent errors from unrecognized control elements in the template
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    loggingService = TestBed.inject(LoggingService);
    fixture = TestBed.createComponent(RetrieveUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`ngOnInit should call the uiService's initialize method`, () => {
    const spy = jest.spyOn(loggingService, 'log');
    component.ngOnInit();
    fixture.detectChanges(); // Triggers ngOnInit()
    expect(spy).toHaveBeenCalled();
  });

  it('should consume data$ from RetrieveUserListUIService', (done) => {
    component.data$.subscribe((data) => {
      expect(data).toBe(mockData);
      done();
    });
  });

  it('should consume isError$ from RetrieveUserListUIService', (done) => {
    component.isError$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isLoading$ from RetrieveUserListUIService', (done) => {
    component.isLoading$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isSuccess$ from RetrieveUserListUIService', (done) => {
    component.isSuccess$.subscribe((data) => {
      expect(data).toBe(true);
      done();
    });
  });
});
