import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '@myMFE/users';
import { User } from '@myMFE/users';
import { ServiceBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { ApiResponse, ServiceContext } from '@patterson-angular/types';

type formControlOption = Record<'value' | 'label', string | number>;

@Injectable({
  providedIn: 'root',
})
export class UpdateUserUIService extends ServiceBase {
  // #region Properties (10)

  private dataSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);
  private isErrorSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isSubmittingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isSuccessSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public readonly data$: Observable<User | undefined> =
    this.dataSubject.asObservable();
  public readonly isError$: Observable<boolean> =
    this.isErrorSubject.asObservable();
  public readonly isLoading$: Observable<boolean> =
    this.isLoadingSubject.asObservable();
  public readonly isSubmitting$: Observable<boolean> =
    this.isSubmittingSubject.asObservable();
  public readonly isSuccess$: Observable<boolean> =
    this.isSuccessSubject.asObservable();

  private colorsSubject: BehaviorSubject<formControlOption[]> =
    new BehaviorSubject<formControlOption[]>([]);
  public readonly colors$: Observable<formControlOption[]> =
    this.colorsSubject.asObservable();

  // #endregion Properties (10)

  // #region Constructors (1)

  constructor(
    private users: Users,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('UpdateUserUIService', loggingService, serviceContext);
    this.initialize();
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  /**
   * Use to initialize the service and perform any initial data operations.
   */
  initialize() {
    this.loggingService.log(
      this.serviceName,
      LogLevel.Information,
      `Preparing to initialize service ${this.serviceName}.`
    );
  }

  /**
   * Use to retrieve the initial data model that will be updated, to display in the form.
   */
  retrieveUser(id: string) {
    this.isLoadingSubject.next(true);
    this.users.retrieveUser<User>(id).subscribe({
      next: (result) => {
        this.handleRetrieveUserResponse<User>(result);
      },
      error: (error) => {
        this.handleRetrieveUserError(error);
      },
      complete: () => {
        this.finishRetrieveUser();
      },
    });
  }

  /**
   * Use to take the data from the form and send to the data service for updating.
   */
  updateUser(user: User) {
    this.isSubmittingSubject.next(true);
    this.users.updateUser<User>(user.id.toString(), user).subscribe({
      next: (result) => {
        this.handleUpdateUserResponse(result);
      },
      error: (error) => {
        this.handleUpdateUserError(error);
      },
      complete: () => {
        this.finishUpdateUser();
      },
    });
  }

  // #endregion Public Methods (3)

  // #region Private Methods (7)

  /**
   * Use to finish the update API call. This method should be called at the end of every
   * handling of an API operation.
   */
  private finishUpdateUser(): void {
    //TODO: HANDLE ANY [finish] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.isSubmittingSubject.next(false);
    this.loggingService.log(
      this.serviceName,
      LogLevel.Information,
      `Finished processing request to [updateUser].`
    );
  }

  /**
   * Use to handle any errors that occur during the update API call. It sets the [isErrorSubject] to true to indicate
   * to the component that an error has occurred.
   *
   * @param error
   */
  private handleUpdateUserError(error: Error): void {
    //TODO: HANDLE ANY [error] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.isSubmittingSubject.next(false);
    this.isErrorSubject.next(true);
    this.handleError(error);
  }

  /**
   * Use to handle the response from the update API call. It sets the [isSuccessSubject] to true to indicate a successful
   * response and sets the [dataSubject] to the data returned from the API call.
   *
   * @param response
   */
  private handleUpdateUserResponse(response: ApiResponse<User>): void {
    this.isSubmittingSubject.next(false);
    if (response) {
      if (response.isSuccess) {
        this.isSuccessSubject.next(true);
        this.loggingService.log(
          this.serviceName,
          LogLevel.Information,
          `Preparing to handle successful response for [updateUser].`
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
          `Preparing to handle failed/unsuccessful response for [updateUser].`
        );
        //TODO: HANDLE ANY [unsuccess] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
      }
    } else {
      this.isErrorSubject.next(true);
      this.loggingService.log(
        this.serviceName,
        LogLevel.Warning,
        `Received unexpected null/undefined response for [updateUser].`
      );
      //TODO: HANDLE ANY ERROR MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    }
  }

  /**
   * Use to finish the retrieve API call. This method should be called at the end of every
   * handling of an API operation.
   */
  private finishRetrieveUser(): void {
    //TODO: HANDLE ANY [finish] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.isLoadingSubject.next(false);
    this.loggingService.log(
      this.serviceName,
      LogLevel.Information,
      `Finished processing request to [retrieveUser].`
    );
  }

  /**
   * Use to handle any errors that occur during the retrieve API call. It sets the [isErrorSubject] to true to indicate
   * to the component that an error has occurred.
   *
   * @param error
   */
  private handleRetrieveUserError(error: Error): void {
    //TODO: HANDLE ANY [error] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.isLoadingSubject.next(false);
    this.isErrorSubject.next(true);
    this.handleError(error);
  }

  /**
   * Use to handle the response from the retrieve API call. It sets the [isSuccessSubject] to true to indicate a successful
   * response and sets the [dataSubject] to the data returned from the API call.
   *
   * @param response
   */
  private handleRetrieveUserResponse<T>(response: ApiResponse<T>): void {
    this.isLoadingSubject.next(false);
    if (response) {
      if (response.isSuccess) {
        this.isSuccessSubject.next(true);
        this.loggingService.log(
          this.serviceName,
          LogLevel.Information,
          `Preparing to handle successful response for [retrieveUser].`
        );
        this.dataSubject.next(response.data as User);
        //TODO: ENABLE NOTIFICATION SERVICE WHEN AVAILABLE/
        // const notice = new Notification('Great news..', 'ADD NOTIFICATION MESSAGE HERE', NotifierType.Toast, NotificationSeverity.success);
        // this.notificationService.addMessage(notice);
      } else {
        this.isErrorSubject.next(true);
        this.loggingService.log(
          this.serviceName,
          LogLevel.Warning,
          `Preparing to handle failed/unsuccessful response for [retrieveUser].`
        );
        //TODO: HANDLE ANY [unsuccess] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
      }
    } else {
      this.isErrorSubject.next(true);
      this.loggingService.log(
        this.serviceName,
        LogLevel.Warning,
        `Received unexpected null/undefined response for [retrieveUser].`
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

  // #endregion Private Methods (7)
}
