// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
/* Cross-Cutting Concerns */
import { AuthenticationModule } from '@patterson-angular/authentication';
import { ConfigurationModule } from '@patterson-angular/configuration';
import { ErrorHandlerModule } from '@patterson-angular/error-handler';
import { HttpServiceModule } from '@patterson-angular/http-service';
import { HttpErrorInterceptorModule } from '@patterson-angular/http-error-interceptor';
import { LoggerModule } from '@patterson-angular/logger';
import { LogWriterAppInsightsModule } from '@patterson-angular/log-writer-app-insights';
import { LogWriterConsoleModule } from '@patterson-angular/log-writer-console';
import { configuration } from '../config/config';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      enableTracing: false,
      paramsInheritanceStrategy: 'always',
    }),
    ConfigurationModule.forRoot({ config: configuration }),
    AuthenticationModule.forRoot(configuration.authenticationConfig),
    ErrorHandlerModule.forRoot(configuration.errorHandlingConfig),
    LoggerModule.forRoot(configuration.loggingConfig),
    LogWriterAppInsightsModule.forRoot(
      configuration.logWriterAppInsightsConfig
    ),
    LogWriterConsoleModule.forRoot(configuration.logWriterConsoleConfig),
    HttpServiceModule.forRoot(configuration.httpServiceConfig),
    HttpErrorInterceptorModule.forRoot(
      configuration.httpErrorInterceptorConfig
    ),
  ],
  providers: [],
})
export class AppModule {}
