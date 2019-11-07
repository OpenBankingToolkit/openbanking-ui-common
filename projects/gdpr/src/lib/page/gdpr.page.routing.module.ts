import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgerockGDPRPageComponent } from './gdpr.page.component';

const routes: Routes = [
  {
    path: '**',
    component: ForgerockGDPRPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgerockGDPRPageRoutingModule {}
