import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@myMFE/users';
import { ComponentBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { UpdateUserUIService } from './update-user-ui.service';

@Component({
  selector: 'lib-ui-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent extends ComponentBase implements OnInit {
  // #region Properties (7)

  updateUserForm!: FormGroup;

  userId = '';

  data$: Observable<User | undefined> = this.uiService.data$;
  isError$: Observable<boolean> = this.uiService.isError$;
  isLoading$: Observable<boolean> = this.uiService.isLoading$;
  isSubmitting$: Observable<boolean> = this.uiService.isSubmitting$;
  isSuccess$: Observable<boolean> = this.uiService.isSuccess$;

  public readonly colors$ = this.uiService.colors$;

  // #endregion Properties (7)

  // #region Constructors (1)

  constructor(
    private uiService: UpdateUserUIService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    router: Router,
    loggingService: LoggingService
  ) {
    super('UpdateUserComponent', loggingService, router);
  }

  // #endregion Constructors (1)

  // #region Public Methods (4)

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.loggingService.log(
      this.componentName,
      LogLevel.Information,
      `Preparing to initialize component ${this.componentName}.`
    );

    this.loadUser();
    this.initializeFormGroup();
  }

  loadUser() {
    this.uiService.retrieveUser(this.userId);
  }

  initializeFormGroup() {
    this.updateUserForm = this.formBuilder.group({
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
      `Preparing to submit the [updateUserForm].`
    );
    this.markFormAsTouched(this.updateUserForm);

    if (this.updateUserForm.valid) {
      this.loggingService.log(
        this.componentName,
        LogLevel.Information,
        `The [updateUserForm] is valid. Preparing to update the User.`
      );
      // retrieve the form values; Typed value matching the User interface
      const updatedUser: User = this.updateUserForm.value;
      // call the service to create the User
      this.uiService.updateUser(updatedUser);
    }
  }

  goBack(): void {
    this.location.back();
  }

  // #endregion Public Methods (4)

  // #region Accessors

  get fullName(): AbstractControl {
    return this.updateUserForm.get('fullName') as FormControl;
  }
  get age(): AbstractControl {
    return this.updateUserForm.get('age') as FormControl;
  }
  get email(): AbstractControl {
    return this.updateUserForm.get('email') as FormControl;
  }
  get password(): AbstractControl {
    return this.updateUserForm.get('password') as FormControl;
  }
  get isEmployee(): AbstractControl {
    return this.updateUserForm.get('isEmployee') as FormControl;
  }
  get startDate(): AbstractControl {
    return this.updateUserForm.get('startDate') as FormControl;
  }
  get hasCar(): AbstractControl {
    return this.updateUserForm.get('hasCar') as FormControl;
  }
  get color(): AbstractControl {
    return this.updateUserForm.get('color') as FormControl;
  }
  get notes(): AbstractControl {
    return this.updateUserForm.get('notes') as FormControl;
  }

  // #endregion Accessors
}
