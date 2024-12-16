import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@myMFE/Users';
import { Users } from '@myMFE/users';
import { ServiceBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { ApiResponse, ServiceContext } from '@patterson-angular/types';

@Injectable({
  providedIn: 'root',
})
export class RetrieveUserListUIService extends ServiceBase {
  // #region Properties (14)

  private dataSubject: BehaviorSubject<User[] | undefined> =
    new BehaviorSubject<User[] | undefined>(undefined);
  private isErrorSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isSuccessSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public readonly data$: Observable<User[] | undefined> =
    this.dataSubject.asObservable();
  public readonly isError$: Observable<boolean> =
    this.isErrorSubject.asObservable();
  public readonly isLoading$: Observable<boolean> =
    this.isLoadingSubject.asObservable();
  public readonly isSuccess$: Observable<boolean> =
    this.isSuccessSubject.asObservable();

  // #endregion Properties (14)

  // #region Constructors (1)

  constructor(
    private users: Users,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('RetrieveUserListUIService', loggingService, serviceContext);
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

    this.dataSubject.next(undefined);
  }

  /**
   * Use to retrieve a list of Users.
   */
  public retrieveUserList(): void {
    this.resetServiceContext();
    this.isLoadingSubject.next(true);

    this.users.retrieveUserList<User[]>().subscribe({
      next: (result) => {
        this.handleRetrieveUserListResponse(result);
      },
      error: (error) => {
        this.handleRetrieveUserListError(error);
      },
      complete: () => {
        this.finishRetrieveUserList();
      },
    });
  }
  // #endregion Public Methods (2)

  // #region Private Methods (3)

  /**
   * Use to finish the API call. This method should be called at the end of every
   * handling of an API operation.
   */
  private finishRetrieveUserList(): void {
    //TODO: HANDLE ANY [finish] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    this.isLoadingSubject.next(false);
    this.loggingService.log(
      this.serviceName,
      LogLevel.Information,
      `Finished processing request to [retrieveUserList].`
    );
  }

  /**
   * Use to handle any errors that occur during the API call. It sets the [isErrorSubject] to true to indicate
   * to the component that an error has occurred.
   *
   * @param error
   */
  private handleRetrieveUserListError(error: Error): void {
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

  private handleRetrieveUserListResponse(response: ApiResponse<User[]>): void {
    this.isLoadingSubject.next(false);
    if (response) {
      if (response.isSuccess) {
        this.isSuccessSubject.next(true);
        this.loggingService.log(
          this.serviceName,
          LogLevel.Information,
          `Preparing to handle successful response for [retrieveUserList].`
        );

        //TODO: ENABLE NOTIFICATION SERVICE WHEN AVAILABLE/
        // const notice = new Notification('Great news..', 'ADD NOTIFICATION MESSAGE HERE', NotifierType.Toast, NotificationSeverity.success);
        // this.notificationService.addMessage(notice);

        if (response.data) {
          this.dataSubject.next(response.data.results as User[]);
        }
      } else {
        this.isErrorSubject.next(true);
        this.loggingService.log(
          this.serviceName,
          LogLevel.Warning,
          `Preparing to handle failed/unsuccessful response for [retrieveUserList].`
        );
        //TODO: HANDLE ANY [unsuccess] MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
      }
    } else {
      this.isErrorSubject.next(true);
      this.loggingService.log(
        this.serviceName,
        LogLevel.Warning,
        `Received unexpected null/undefined response for [retrieveUserList].`
      );
      //TODO: HANDLE ANY ERROR MESSAGES, NOTIFICATIONS, UI/UX CHANGES;
    }
  }
  // #endregion Private Methods (3)
}
