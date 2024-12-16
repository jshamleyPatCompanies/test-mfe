import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersBusinessProviderService } from './business/users-business-provider.service';
import { UsersRepositoryService } from './business/users-repository.service';
import { ServiceContext } from '@patterson-angular/types';

@NgModule({
  imports: [CommonModule],
  providers: [
    UsersRepositoryService,
    UsersBusinessProviderService,
    ServiceContext,
  ],
})
export class UsersModule {}
