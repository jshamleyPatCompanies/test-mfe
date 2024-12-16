import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@myMFE/users';
import { ServiceBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { ApiResponse, ServiceContext } from '@patterson-angular/types';
import { Users } from '@myMFE/users';

@Injectable({
  providedIn: 'root',
})
export class RetrieveUserUIService extends ServiceBase {
  // #region Properties (8)

  private dataSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);
  private isErrorSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isSuccessSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public readonly data$: Observable<User | undefined> =
    this.dataSubject.asObservable();
  public readonly isError$: Observable<boolean> =
    this.isErrorSubject.asObservable();
  public readonly isLoading$: Observable<boolean> =
    this.isLoadingSubject.asObservable();
  public readonly isSuccess$: Observable<boolean> =
    this.isSuccessSubject.asObservable();

  // #endregion Properties (8)

  // #region Constructors (1)

  constructor(
    private users: Users,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('RetrieveUserUIService', loggingService, serviceContext);
    this.initialize();
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  /**
   * Use to initialize the service and perform any initial data operations.
   */
  public initialize() {
    this.loggingService.log(
      this.serviceName,
      LogLevel.Information,
      `Preparing to initialize service ${this.serviceName}.`
    );
  }

  /**
   * Use to retrieve the data model to be displayed.
   */
  public retrieveUser(id: string) {
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

  // #endregion Public Methods (2)

  // #region Private Methods (3)

  /**
   * Use to finish the API call. This method should be called at the end of every
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
   * Use to handle any errors that occur during the API call. It sets the [isErrorSubject] to true to indicate
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
   * Use to handle the response from the API call. It sets the [isSuccessSubject] to true to indicate a successful
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

  // #endregion Private Methods (3)
}
