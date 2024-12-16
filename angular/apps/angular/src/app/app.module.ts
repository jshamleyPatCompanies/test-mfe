// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [NxWelcomeComponent, RouterModule],
  providers: [],
})
export class AppModule {}
