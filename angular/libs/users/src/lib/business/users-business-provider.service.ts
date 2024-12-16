import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '@patterson-angular/configuration';
import { ServiceBase } from '@patterson-angular/foundation';
import { LoggingService } from '@patterson-angular/logger';
import {
  ApiPaginationResponse,
  ApiResponse,
  PaginatedListRequest,
  ServiceContext,
} from '@patterson-angular/types';
import { UsersRepositoryService } from './users-repository.service';
import { CreateUserAction } from './actions/create-user.action';
@Injectable({
  providedIn: 'root',
})
export class UsersBusinessProviderService extends ServiceBase {
  constructor(
    public repositoryService: UsersRepositoryService,
    public configService: ConfigurationService,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('BusinessProviderService', loggingService, serviceContext);
  }
  /**
   * TODO: Add comment here describing what this method does
   * @param userId TODO: Adjust parameters as needed and add comments accordingly for each
   */
  createUser<T>(userId: string): Observable<ApiResponse<T>> {
    const action = new CreateUserAction<T>(userId);
    action.Do({ ...this });
    return action.response;
  }
}
