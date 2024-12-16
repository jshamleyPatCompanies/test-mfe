import { LogLevel } from '@patterson-angular/logger';
import { IConfiguration } from '@patterson-angular/configuration';

export const configuration: IConfiguration = {
  //TODO: Set all app-specific configuration here
  appConfig: {
    isProduction: true,
    environmentName: 'prod',
    //TODO: Set the base URL for your PROD environment BFF API, or any backend APIs your app is hitting directly, here
    bffBaseUrl: 'https://prod-my-bff-api.com',
  },
  authenticationConfig: {
    authority:
      'https://us-n-dpms-wap-vapi-004.fusebeta.pattersondental.com/sts',
    //TODO: Set token service client ID corresponding to your app here
    clientId: 'pathub',
    //TODO: Set desired post-logout redirect URI here
    postLogoutRedirectUri: 'https://prod-my-app.com/',
    //TODO: Set desired URI to be redirected to after authentication here
    redirectUri: 'https://prod-my-app.com/auth-callback',
    responseType: 'id_token token',
    scope: 'openid pattersonuniversalid pat.platform.api',
    //TODO: Provide path to silent-refresh.html here
    silentRedirectUri: 'https://prod-my-app.com/silent-refresh.html',
    tokenService:
      'https://us-n-dpms-wap-vapi-004.fusebeta.pattersondental.com/sts/connect/token',
  },
  errorHandlingConfig: {
    applicationName: 'prod',
    errorContext: 'prod context',
    includeDefaultErrorHandling: false,
  },
  httpErrorInterceptorConfig: {
    applicationName: 'prod',
    //TODO: Set desired relative URL to redirect to when user is unauthorized here
    unauthorizedUrl: '/auth/login',
  },
  httpServiceConfig: {
    applicationName: 'prod',
    //TODO: Set desired base URL for HTTP requests here
    baseUrl: 'prod base url',
    timeout: 100, // Timeout in seconds
  },
  loggingConfig: {
    applicationName: 'prod',
    isProduction: false,
  },
  logWriterAppInsightsConfig: {
    //TODO: Set desired App Insights logging verbosity for PROD environment here
    verbosity: LogLevel.Information, // Logs Info, Warnings, Errors
    //TODO: Add your app's App Insights instrumentation key here
    destinationKey: '', // App Insights Instrumentation Key
  },
  logWriterConsoleConfig: {
    //TODO: Set desired Console logging verbosity for PROD environment here
    verbosity: LogLevel.Information, // Logs Info, Warnings, Errors
  },
};
