import { LogLevel } from '@patterson-angular/logger';
import { IConfiguration } from '@patterson-angular/configuration';

export const configuration: IConfiguration = {
  //TODO: Set all app-specific configuration here
  appConfig: {
    isProduction: false,
    environmentName: 'test',
    //TODO: Set the base URL for your TEST environment BFF API, or any backend APIs your app is hitting directly, here
    bffBaseUrl: 'https://test-my-bff-api.com',
  },
  authenticationConfig: {
    authority:
      'https://test-platform-token-api.practicemgmt-test.pattersondevops.com/sts',
    //TODO: Set token service client ID corresponding to your app here
    clientId: 'pathub',
    //TODO: Set desired post-logout redirect URI here
    postLogoutRedirectUri: 'https://test-my-app.com/',
    //TODO: Set desired URI to be redirected to after authentication here
    redirectUri: 'https://test-my-app.com/auth-callback',
    responseType: 'id_token token',
    scope: 'openid pattersonuniversalid pat.platform.api',
    //TODO: Provide path to silent-refresh.html here
    silentRedirectUri: 'https://test-my-app.com/silent-refresh.html',
    tokenService:
      'https://test-platform-token-api.practicemgmt-test.pattersondevops.com/sts/connect/token',
  },
  errorHandlingConfig: {
    applicationName: 'test',
    errorContext: 'test context',
    includeDefaultErrorHandling: false,
  },
  httpErrorInterceptorConfig: {
    applicationName: 'test',
    //TODO: Set desired relative URL to redirect to when user is unauthorized here
    unauthorizedUrl: '/auth/login',
  },
  httpServiceConfig: {
    applicationName: 'test',
    //TODO: Set desired base URL for HTTP requests here
    baseUrl: 'test base url',
    timeout: 100, // Timeout in seconds
  },
  loggingConfig: {
    applicationName: 'test',
    isProduction: false,
  },
  logWriterAppInsightsConfig: {
    //TODO: Set desired App Insights logging verbosity for TEST environment here
    verbosity: LogLevel.Information, // Logs Info, Warnings, Errors
    //TODO: Add your app's App Insights instrumentation key here
    destinationKey: '7a7bbb34-40c0-404e-aa4f-9f215642831e', // App Insights Instrumentation Key
  },
  logWriterConsoleConfig: {
    //TODO: Set desired Console logging verbosity for TEST environment here
    verbosity: LogLevel.Information, // Logs Info, Warnings, Errors
  },
};
