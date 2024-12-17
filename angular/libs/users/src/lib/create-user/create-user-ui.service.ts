import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '@myMFE/users';
import { User } from '@myMFE/users';
import { ServiceBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { ApiResponse, ServiceContext } from '@patterson-angular/types';

//TODO: Need to add default and control-specific modules for Kendo UI for Angular;
import { FormFieldModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';

@Injectable({
  providedIn: 'root',
})
export class CreateUserUIService extends ServiceBase {
  // #region Properties (6)

  private isErrorSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isSubmittingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isSuccessSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public readonly isError$: Observable<boolean> =
    this.isErrorSubject.asObservable();
  public readonly isSubmitting$: Observable<boolean> =
    this.isSubmittingSubject.asObservable();
  public readonly isSuccess$: Observable<boolean> =
    this.isSuccessSubject.asObservable();

  private colorsSubject: BehaviorSubject<formControlOption[]> =
    new BehaviorSubject<formControlOption[]>([]);
  public readonly colors$: Observable<formControlOption[]> =
    this.colorsSubject.asObservable();

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(
    private users: Users,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('CreateUserUiService', loggingService, serviceContext);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public createUser(newUser: User) {
    this.isSubmittingSubject.next(true);
    this.subscribe(
      this.users.createUser<User>(newUser).subscribe({
        next: (response: ApiResponse<User>) =>
          this.handleCreateUserResponse(response),
        error: (error: Error) => this.handleCreateUserError(error as Error),
        complete: () => this.finishCreateUser(),
      })
    );
  }

  // #endregion Public Methods (1)

  // #region Private Methods (4)

  /**
   * Use to finish the API call. This method should be called at the end of every
   * handling of an API operation.
   */
  private finishCreateUser(): void {
    //TODO: HANDLE ANY [finish] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.isSubmittingSubject.next(false);
    this.loggingService.log(
      this.serviceName,
      LogLevel.Information,
      `Finished processing request to [createUser].`
    );
  }

  /**
   * Use to handle any errors that occur during the API call. It sets the [isErrorSubject] to true to indicate
   * to the component that an error has occurred.
   *
   * @param error
   */
  private handleCreateUserError(error: Error): void {
    //TODO: HANDLE ANY [error] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;

    this.isSubmittingSubject.next(false);
    this.isErrorSubject.next(true);
    this.handleError(error);
  }

  /**
   * Use to handle the response from the API call. It sets the [isSuccessSubject] to true to indicate a successful
   * response and sets the [dataSubject] to the data returned from the API call.
   *
   * @param response
   */
  private handleCreateUserResponse(response: ApiResponse<User>): void {
    this.isSubmittingSubject.next(false);
    if (response) {
      if (response.isSuccess) {
        this.isSuccessSubject.next(true);
        this.loggingService.log(
          this.serviceName,
          LogLevel.Information,
          `Preparing to handle successful response for [createUser].`
        );

        //TODO: ENABLE NOTIFICATION SERVICE WHEN AVAILABLE/
        // const notice = new Notification('Great news..', 'ADD NOTIFICATION MESSAGE HERE', NotifierType.Toast, NotificationSeverity.success);
        // this.notificationService.addMessage(notice);

        if (response.data) {
          //TODO: HANDLE ANY [success] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
        }
      } else {
        this.isErrorSubject.next(true);
        this.loggingService.log(
          this.serviceName,
          LogLevel.Warning,
          `Preparing to handle failed/unsuccessful response for [createUser].`
        );
        //TODO: HANDLE ANY [unsuccess] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
      }
    } else {
      this.isErrorSubject.next(true);
      this.loggingService.log(
        this.serviceName,
        LogLevel.Warning,
        `Received unexpected null/undefined response for [createUser].`
      );
      //TODO: HANDLE ANY ERROR MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    }
  }

  /**
   * Use to reset the state of the component.
   */
  private resetComponentState(): void {
    this.isErrorSubject.next(false);
    this.isSubmittingSubject.next(false);
    this.isSuccessSubject.next(false);
  }

  // #endregion Private Methods (4)
}
