import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgerockAuthOauth2AuthorizeComponent } from './forgerock-auth-oauth2-authorize.component';

const routes: Routes = [
  {
    path: '**',
    component: ForgerockAuthOauth2AuthorizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgerockAuthOauth2AuthorizeRoutingModule {}
