import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RetrieveUserComponent } from './retrieve-user.component';
import { RetrieveUserUIService } from './retrieve-user-ui.service';
import { Users } from '@myMFE/users';

const routes: Routes = [{ path: '', component: RetrieveUserComponent }];

@NgModule({
  declarations: [RetrieveUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [RetrieveUserUIService, Users],
})
export class RetrieveUserModule {}
