import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { User } from '@myMFE/users';
import { LoggingService } from '@patterson-angular/logger';
import { Users } from '@myMFE/users';
import { UpdateUserComponent } from './update-user.component';
import { UpdateUserUIService } from './update-user-ui.service';

describe('UpdateUserComponent', () => {
  // Mock Data: Implement the properties of the specified domain model;
  const mockData: User = {
    //TODO: IMPLEMENT THE PROPERTIES OF THE SPECIFIED DOMAIN MODEL;
  };

  // Mock Domain Service:
  const mockUsers = {
    retrieveUser: jest
      .fn()
      .mockReturnValue(of({ isSuccess: true, data: mockData })),
    updateUser: jest
      .fn()
      .mockReturnValue(of({ isSuccess: true, data: mockData })),
  };

  // Mock UI Service:
  const mockUIService = {
    initialize: jest.fn(),
    retrieveUser: jest.fn(),
    updateUser: jest.fn(),
    data$: of(mockData), // Mock Observable
    isError$: of(false), // Mock Observable
    isLoading$: of(false), // Mock Observable
    isSubmitting$: of(false), // Mock Observable
    isSuccess$: of(true), // Mock Observable
  };

  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let loggingService: LoggingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: mockData.id }) },
        },
        { provide: UpdateUserUIService, useValue: mockUIService },
        { provide: Users, useValue: mockUsers },
      ],
      declarations: [UpdateUserComponent],
    }).compileComponents();

    loggingService = TestBed.inject(LoggingService);
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group', () => {
    expect(component.updateUserForm).toBeTruthy();
  });

  it(`ngOnInit should call the uiService's initialize method`, () => {
    const spy = jest.spyOn(loggingService, 'log');
    component.ngOnInit();
    fixture.detectChanges(); // Triggers ngOnInit()
    expect(spy).toHaveBeenCalled();
  });

  it('should consume data$ from UpdateUserUIService', (done) => {
    component.data$.subscribe((data) => {
      expect(data).toBe(mockData);
      done();
    });
  });

  it('should consume isError$ from UpdateUserUIService', (done) => {
    component.isError$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isLoading$ from UpdateUserUIService', (done) => {
    component.isLoading$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isSubmitting$ from UpdateUserUIService', (done) => {
    component.isSubmitting$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isSuccess$ from UpdateUserUIService', (done) => {
    component.isSuccess$.subscribe((data) => {
      expect(data).toBe(true);
      done();
    });
  });
});
