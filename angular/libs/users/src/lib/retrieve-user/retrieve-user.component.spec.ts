import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { User } from '@myMFE/users';
import { LoggingService } from '@patterson-angular/logger';
import { Users } from '@myMFE/users';
import { RetrieveUserComponent } from './retrieve-user.component';
import { RetrieveUserUIService } from './retrieve-user-ui.service';

describe('RetrieveUserComponent', () => {
  // Mock Data: Implement the properties of the specified domain model;
  const mockData: User = {
    //TODO: Mock the payload for the specified domain service operation;
  };

  // Mock Domain Service:
  const mockUsers = {
    retrieveUser: jest
      .fn()
      .mockReturnValue(of({ isSuccess: true, data: mockData })),
  };

  // Mock UI Service:
  const mockUIService = {
    initialize: jest.fn(),
    retrieveUser: jest.fn(),
    data$: of(mockData), // Mock Observable
    isError$: of(false), // Mock Observable
    isLoading$: of(false), // Mock Observable
    isSuccess$: of(true), // Mock Observable
  };

  let component: RetrieveUserComponent;
  let fixture: ComponentFixture<RetrieveUserComponent>;
  let loggingService: LoggingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: mockData.id }) },
        },
        { provide: RetrieveUserUIService, useValue: mockUIService },
        { provide: Users, useValue: mockUsers },
      ],
      declarations: [RetrieveUserComponent],
    }).compileComponents();

    loggingService = TestBed.inject(LoggingService);
    fixture = TestBed.createComponent(RetrieveUserComponent);
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

  it('should consume data$ from RetrieveUserUIService', (done) => {
    component.data$.subscribe((data) => {
      expect(data).toBe(mockData);
      done();
    });
  });

  it('should consume isError$ from RetrieveUserUIService', (done) => {
    component.isError$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isLoading$ from RetrieveUserUIService', (done) => {
    component.isLoading$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isSuccess$ from RetrieveUserUIService', (done) => {
    component.isSuccess$.subscribe((data) => {
      expect(data).toBe(true);
      done();
    });
  });
});
