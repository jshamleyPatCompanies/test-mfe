import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { Users } from '@myMFE/users';
import { RetrieveUserListComponent } from './retrieve-user-list.component';
import { RetrieveUserListUIService } from './retrieve-user-list-ui.service';

const routes: Routes = [{ path: '', component: RetrieveUserListComponent }];

@NgModule({
  declarations: [RetrieveUserListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), GridModule],
  providers: [RetrieveUserListUIService, Users],
})
export class RetrieveUserListModule {}
