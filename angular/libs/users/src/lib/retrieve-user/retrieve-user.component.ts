import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@myMFE/users';
import { ComponentBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';
import { RetrieveUserUIService } from './retrieve-user-ui.service';

@Component({
  selector: 'lib-retrieve-user',
  templateUrl: './retrieve-user.component.html',
  styleUrls: ['./retrieve-user.component.scss'],
})
export class RetrieveUserComponent extends ComponentBase implements OnInit {
  // #region Properties (4)

  userId = '';

  data$: Observable<User | undefined> = this.uiService.data$;
  isError$: Observable<boolean> = this.uiService.isError$;
  isLoading$: Observable<boolean> = this.uiService.isLoading$;
  isSuccess$: Observable<boolean> = this.uiService.isSuccess$;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private uiService: RetrieveUserUIService,
    private route: ActivatedRoute,
    router: Router,
    loggingService: LoggingService
  ) {
    super('RetrieveUserComponent', loggingService, router);
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.loggingService.log(
      this.componentName,
      LogLevel.Information,
      `Preparing to initialize component ${this.componentName}.`
    );

    this.loadUser();
  }

  public loadUser() {
    this.uiService.retrieveUser(this.userId);
  }

  // #endregion Public Methods (1)
}
