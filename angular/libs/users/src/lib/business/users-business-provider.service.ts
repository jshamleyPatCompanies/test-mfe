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

  // someMethod<T>(someInput: string): Observable<ApiResponse<T>> {
  //   const action = new SomeAction<T>(someInput);
  //   action.Do({...this});
  //   return action.response;
  // }
}
