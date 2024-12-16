import { LogLevel } from '@patterson-angular/logger';
import { IConfiguration } from '@patterson-angular/configuration';

export const configuration: IConfiguration = {
  //TODO: Set all app-specific configuration here
  appConfig: {
    isProduction: false,
    environmentName: 'local',
    //TODO: Set the base URL for your locally-running BFF API, or any backend APIs your app is hitting directly, here
    bffBaseUrl: 'https://localhost:<my-bff-api-port>',
  },
  authenticationConfig: {
    authority: 'https://localhost:52398/sts',
    //TODO: Set token service client ID corresponding to your app here
    clientId: 'pathub',
    //TODO: Set desired post-logout redirect URI here
    postLogoutRedirectUri: 'https://localhost:4200/',
    //TODO: Set desired URI to be redirected to after authentication here
    redirectUri: 'https://localhost:4200/auth-callback',
    responseType: 'id_token token',
    scope: 'openid pattersonuniversalid pat.platform.api',
    //TODO: Provide path to silent-refresh.html here
    silentRedirectUri: 'https://localhost:4200/silent-refresh.html',
    tokenService: 'https://localhost:52398/sts/connect/token',
  },
  errorHandlingConfig: {
    applicationName: 'local',
    errorContext: 'local context',
    includeDefaultErrorHandling: false,
  },
  httpErrorInterceptorConfig: {
    applicationName: 'local',
    //TODO: Set desired relative URL to redirect to when user is unauthorized here
    unauthorizedUrl: '/auth/login',
  },
  httpServiceConfig: {
    applicationName: 'local',
    //TODO: Set desired base URL for HTTP requests here
    baseUrl: 'local base url',
    timeout: 100, // Timeout in seconds
  },
  loggingConfig: {
    applicationName: 'local',
    isProduction: false,
  },
  logWriterAppInsightsConfig: {
    //TODO: Set desired App Insights logging verbosity for local development here
    verbosity: LogLevel.Information, // Logs Info, Warnings, Errors
    //TODO: Add your app's App Insights instrumentation key here
    destinationKey: '7a7bbb34-40c0-404e-aa4f-9f215642831e', // App Insights Instrumentation Key
  },
  logWriterConsoleConfig: {
    //TODO: Set desired Console logging verbosity for local development here
    verbosity: LogLevel.Information, // Logs Info, Warnings, Errors
  },
};
