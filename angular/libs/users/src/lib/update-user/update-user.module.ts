import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { Users } from '@myMFE/users';
import { UpdateUserComponent } from './update-user.component';
import { UpdateUserUIService } from './update-user-ui.service';

const routes: Routes = [{ path: ':id', component: UpdateUserComponent }];

@NgModule({
  declarations: [UpdateUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    ButtonsModule,
    IndicatorsModule,
    InputsModule,
    LabelModule,
    DateInputsModule,
    DropDownsModule,
  ],
  providers: [UpdateUserUIService, Users],
})
export class UpdateUserModule {}
