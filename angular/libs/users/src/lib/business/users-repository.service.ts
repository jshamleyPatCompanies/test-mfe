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

  // performUsers(): Observable<any> {
  // const requestUrl = `${this.configService.settings.appConfig.bffBaseUrl}/doSomething`;
  // this.loggingService.log(this.serviceName, LogLevel.Information, `Preparing to call API to... `);
  // const options = this.httpService.createOptions(HttpRequestMethod.get, requestUrl, this.httpService.createHeader(), null, undefined, false );
  // return this.httpService.execute(options);
  // }
}
