import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@myMFE/users';
import { ComponentBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { CreateUserUIService } from './create-user-ui.service';

@Component({
  selector: 'lib-ui-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends ComponentBase implements OnInit {
  // #region Properties (4)

  createUserForm!: FormGroup;

  isError$: Observable<boolean> = this.uiService.isError$;
  isSubmitting$: Observable<boolean> = this.uiService.isSubmitting$;
  isSuccess$: Observable<boolean> = this.uiService.isSuccess$;

  public readonly colors$ = this.uiService.colors$;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private uiService: CreateUserUIService,
    private formBuilder: FormBuilder,
    private location: Location,
    router: Router,
    loggingService: LoggingService
  ) {
    super('CreateUserComponent', loggingService, router);
  }

  // #endregion Constructors (1)

  // #region Public Methods (4)

  ngOnInit() {
    this.loggingService.log(
      this.componentName,
      LogLevel.Information,
      `Preparing to initialize component ${this.componentName}.`
    );
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.createUserForm = this.formBuilder.group({
      fullName: [
        undefined,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(2),
        ],
      ],
      age: [
        undefined,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.min(0),
        ],
      ],
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required, Validators.minLength(8)]],
      isEmployee: [undefined, [Validators.required]],
      startDate: [undefined, [Validators.required]],
      hasCar: [undefined, [Validators.required]],
      color: [undefined, [Validators.required]],
      notes: [undefined, [Validators.maxLength(500)]],
    });
  }

  onSubmit() {
    this.loggingService.log(
      this.componentName,
      LogLevel.Information,
      `Preparing to submit the [createUserForm].`
    );
    this.markFormAsTouched(this.createUserForm);

    if (this.createUserForm.valid) {
      this.loggingService.log(
        this.componentName,
        LogLevel.Information,
        `The [createUserForm] is valid. Preparing to create the User.`
      );
      // retrieve the form values; Typed value matching the User interface
      const newUser: User = this.createUserForm.value;
      // call the service to create the User
      this.uiService.createUser(newUser);
    }
  }

  goBack(): void {
    this.location.back();
  }

  // #endregion Public Methods (4)

  // #region Accessors

  get fullName(): AbstractControl {
    return this.createUserForm.get('fullName') as FormControl;
  }
  get age(): AbstractControl {
    return this.createUserForm.get('age') as FormControl;
  }
  get email(): AbstractControl {
    return this.createUserForm.get('email') as FormControl;
  }
  get password(): AbstractControl {
    return this.createUserForm.get('password') as FormControl;
  }
  get isEmployee(): AbstractControl {
    return this.createUserForm.get('isEmployee') as FormControl;
  }
  get startDate(): AbstractControl {
    return this.createUserForm.get('startDate') as FormControl;
  }
  get hasCar(): AbstractControl {
    return this.createUserForm.get('hasCar') as FormControl;
  }
  get color(): AbstractControl {
    return this.createUserForm.get('color') as FormControl;
  }
  get notes(): AbstractControl {
    return this.createUserForm.get('notes') as FormControl;
  }

  // #endregion Accessors
}
