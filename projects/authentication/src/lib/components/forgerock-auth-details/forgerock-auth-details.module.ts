import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TranslateModule } from '@ngx-translate/core';

import { ForgerockAuthDetailsComponent } from './forgerock-auth-details.component';
import { ForgerockAuthDetailsContainer } from './forgerock-auth-details.container';
import { CanDeactivateGuard } from '@forgerock/openbanking-ngx-common/guards';
import { ForgerockConfirmDialogModule } from '@forgerock/openbanking-ngx-common/components/forgerock-confirm-dialog';
import { ForgerockAuthProfileModule } from '../forgerock-auth-profile/forgerock-auth-profile.module';

const routes: Routes = [
  {
    path: '**',
    component: ForgerockAuthDetailsContainer
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ForgerockConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ForgerockAuthProfileModule
  ],
  declarations: [ForgerockAuthDetailsComponent, ForgerockAuthDetailsContainer],
  exports: [ForgerockAuthDetailsComponent, ForgerockAuthDetailsContainer],
  providers: [CanDeactivateGuard]
})
export class ForgerockAuthDetailsModule {}
