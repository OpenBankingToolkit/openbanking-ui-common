import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgerockDevInfoComponent } from './forgerock-dev-info.component';
import { ForgerockCustomerLogoModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-logo';

const routes: Routes = [
  {
    path: '**',
    component: ForgerockDevInfoComponent
  }
];

@NgModule({
  imports: [CommonModule, MatCardModule, TranslateModule, ForgerockCustomerLogoModule, RouterModule.forChild(routes)],
  declarations: [ForgerockDevInfoComponent]
})
export class ForgerockDevInfoModule {}
