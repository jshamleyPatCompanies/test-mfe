import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { User } from '@myMFE/users';
import { LoggingService } from '@patterson-angular/logger';
import { Users } from '@myMFE/users';
import { CreateUserComponent } from './create-user.component';
import { CreateUserUIService } from './create-user-ui.service';

// Required to support TextEncoder in Jest|KendoUI; must be imported before KendoUI for Angular;
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

import {
  FormFieldModule, //KendoUI for Angular; required default
  TextBoxModule, //TODO: KendoUI for Angular: Add control-specific modules (e.g. TextBoxModule);
} from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';

describe('CreateUserComponent', () => {
  // Mock Data: Implement the properties of the specified domain model;
  const mockData: User = {
    //TODO: IMPLEMENT THE PROPERTIES OF THE SPECIFIED DOMAIN MODEL;
  };

  // Mock Domain Service:
  const mockUsers = {
    createUser: jest
      .fn()
      .mockReturnValue(of({ isSuccess: true, data: mockData })),
  };

  // Mock UI Service:
  const mockUIService = {
    createUser: jest.fn(),
    isError$: of(false), // Mock Observable
    isSubmitting$: of(false), // Mock Observable
    isSuccess$: of(true), // Mock Observable
  };

  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let loggingService: LoggingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FormFieldModule, //KendoUI for Angular
        LabelModule, //KendoUI for Angular
        //TODO: Need to add default and control-specific module "imports" for Kendo UI for Angular;
        TextBoxModule, //KendoUI for Angular: TextBox
      ],
      providers: [
        FormBuilder,
        { provide: CreateUserUIService, useValue: mockUIService },
        { provide: Users, useValue: mockUsers },
      ],
      declarations: [CreateUserComponent],
    }).compileComponents();

    loggingService = TestBed.inject(LoggingService);
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group', () => {
    expect(component.createUserForm).toBeTruthy();
  });

  it('should consume isSubmitting$ from CreateUserUIService', (done) => {
    component.isSubmitting$.subscribe((data) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should consume isSuccess$ from CreateUserUIService', (done) => {
    component.isSuccess$.subscribe((data) => {
      expect(data).toBe(true);
      done();
    });
  });

  it('should consume isError$ from CreateUserUIService', (done) => {
    component.isError$.subscribe((data: boolean) => {
      expect(data).toBe(false);
      done();
    });
  });

  it('should call/use the logging service', () => {
    const spy = jest.spyOn(loggingService, 'log');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
