import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase } from '@patterson-angular/foundation';
import { LoggingService } from '@patterson-angular/logger';
import {
  ApiPaginationResponse,
  ApiResponse,
  PaginatedListRequest,
  ServiceContext,
} from '@patterson-angular/types';
import { UsersBusinessProviderService } from './business/users-business-provider.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ServiceBase {
  constructor(
    private businessProvider: UsersBusinessProviderService,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('UsersService', loggingService, serviceContext);
    this.businessProvider.serviceContext = this.serviceContext;
  }

  // someMethod<T>(someInput: string): Observable<ApiResponse<T>> {
  //   return this.businessProvider.businessProviderMethod<T>(someInput);
  // }
}
