import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ComponentBase } from '@patterson-angular/foundation';
import { LogLevel, LoggingService } from '@patterson-angular/logger';

import { Observable } from 'rxjs';
import { RetrieveUserListUIService } from './retrieve-user-list-ui.service';
import { User } from '@myMFE/Users';

@Component({
  selector: 'lib-ui-retrieve-user-list',
  templateUrl: './retrieve-user-list.component.html',
  styleUrls: ['./retrieve-user-list.component.scss'],
})
export class RetrieveUserListComponent extends ComponentBase implements OnInit {
  // #region Properties (4)

  data$: Observable<User[] | undefined> = this.uiService.data$;
  isError$: Observable<boolean> = this.uiService.isError$;
  isLoading$: Observable<boolean> = this.uiService.isLoading$;
  isSuccess$: Observable<boolean> = this.uiService.isSuccess$;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(
    private uiService: RetrieveUserListUIService,
    loggingService: LoggingService,
    router: Router
  ) {
    super('RetrieveUserListComponent', loggingService, router);
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public ngOnInit() {
    this.loggingService.log(
      this.componentName,
      LogLevel.Information,
      `Preparing to initialize component ${this.componentName}.`
    );

    this.loadUserList();
  }

  public loadUserList() {
    this.uiService.retrieveUserList(this.paginatedListRequest);
  }

  // #endregion Public Methods (3)
}
