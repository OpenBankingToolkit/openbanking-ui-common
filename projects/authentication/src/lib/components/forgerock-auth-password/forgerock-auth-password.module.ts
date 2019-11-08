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

import { ForgerockAuthPasswordComponent } from './forgerock-auth-password.component';
import { ForgerockAuthPasswordContainer } from './forgerock-auth-password.container';
import { CanDeactivateGuard } from 'ob-ui-libs/guards';
import { ForgerockConfirmDialogModule } from 'ob-ui-libs/components/forgerock-confirm-dialog';
import { ForgerockAuthProfileModule } from '../forgerock-auth-profile/forgerock-auth-profile.module';

const routes: Routes = [
  {
    path: '**',
    component: ForgerockAuthPasswordContainer
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
  declarations: [ForgerockAuthPasswordComponent, ForgerockAuthPasswordContainer],
  exports: [ForgerockAuthPasswordComponent, ForgerockAuthPasswordContainer],
  providers: [CanDeactivateGuard]
})
export class ForgerockAuthPasswordModule {}
