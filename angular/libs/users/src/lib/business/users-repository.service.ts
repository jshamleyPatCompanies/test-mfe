/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '@patterson-angular/configuration';
import { ServiceBase } from '@patterson-angular/foundation';
import {
  HttpRequestMethod,
  HttpService,
} from '@patterson-angular/http-service';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { PaginatedListRequest, ServiceContext } from '@patterson-angular/types';
import { IUsersRepositoryService } from './i-users-repository.service';
@Injectable({
  providedIn: 'root',
})
export class UsersRepositoryService
  extends ServiceBase
  implements IUsersRepositoryService
{
  requestHeaders!: HttpHeaders;
  baseUrl!: string;
  /**
   *
   * @param configService A configuration service that provides access to the application configuration.
   * @param httpService An HTTP service that provides features to create API/Http requests.
   * @param loggingService A general purpose logging service.
   * @param serviceContext A service context that provides access to contextual information.
   */
  constructor(
    private httpService: HttpService,
    private configService: ConfigurationService,
    loggingService: LoggingService,
    serviceContext: ServiceContext
  ) {
    super('UsersRepositoryService', loggingService, serviceContext);
  }
  /**
   * TODO: Add comment here describing what this method does
   * @param userId TODO: Adjust parameters as needed and add comments accordingly for each
   */
  createUser<T>(userId: string): Observable<T> {
    const requestUrl = `${this.baseUrl}/api/v1/Users/${userId}`;
    const message = `${this.serviceName} preparing to call: ${requestUrl}`;
    this.loggingService.log(this.serviceName, LogLevel.Information, message);
    const requestOptions = this.httpService.createOptions(
      HttpRequestMethod.get,
      requestUrl,
      this.requestHeaders,
      '',
      undefined,
      false
    );
    return this.httpService.execute<T>(requestOptions);
  }
}
