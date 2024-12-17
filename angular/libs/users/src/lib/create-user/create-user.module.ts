import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { Users } from '@myMFE/users';
import { CreateUserComponent } from './create-user.component';
import { CreateUserUIService } from './create-user-ui.service';

const routes: Routes = [{ path: '', component: CreateUserComponent }];

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    ButtonsModule,
    InputsModule,
    LabelModule,
    DateInputsModule,
    DropDownsModule,
  ],
  providers: [CreateUserUIService, Users],
})
export class CreateUserModule {}
