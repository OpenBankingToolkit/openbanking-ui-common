import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginDynamicInputsModule } from '../dynamic-inputs/dynamic-inputs.module';
import { ExchanceCodeComponent } from './exchance-code.component';
import { DynamicFieldDirective } from '../directives/dynamic-field.directive';
import { ProgrammaticInputFireEventDirective } from '../directives/programmatic-input-fire-event.directive';
import { DataStore1Component } from './data-store1.component';
import { UnknownStageComponent } from './unknown-stage.component';
import { AuthenticatorPush3Component } from './authenticator-push3.component';
import { AuthenticatorPush4Component } from './authenticator-push4.component';
import { AuthenticatorPush5Component } from './authenticator-push5.component';
import { AuthenticatorPushRegistration2Component } from './authenticator-push-registration2.component';
import { AuthenticatorPushRegistration3Component } from './authenticator-push-registration3.component';
import { AuthenticatorPushRegistration4Component } from './authenticator-push-registration4.component';
import { AuthenticatorPushRegistration5Component } from './authenticator-push-registration5.component';
import { AuthenticatorRedirectComponent } from './authenticator-redirect.component';
import { StagesComponent } from './stages.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginDynamicInputsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [
    LoginDynamicInputsModule,
    DataStore1Component,
    UnknownStageComponent,
    AuthenticatorPush3Component,
    AuthenticatorPush4Component,
    AuthenticatorPush5Component,
    AuthenticatorPushRegistration2Component,
    AuthenticatorPushRegistration3Component,
    AuthenticatorPushRegistration4Component,
    AuthenticatorPushRegistration5Component,
    AuthenticatorRedirectComponent,
    StagesComponent,
    ExchanceCodeComponent
  ],
  declarations: [
    DataStore1Component,
    UnknownStageComponent,
    AuthenticatorPush3Component,
    AuthenticatorPush4Component,
    AuthenticatorPush5Component,
    AuthenticatorPushRegistration2Component,
    AuthenticatorPushRegistration3Component,
    AuthenticatorPushRegistration4Component,
    AuthenticatorPushRegistration5Component,
    AuthenticatorRedirectComponent,
    StagesComponent,
    NotFoundComponent,
    DynamicFieldDirective,
    ProgrammaticInputFireEventDirective,
    ExchanceCodeComponent
  ],
  entryComponents: [
    DataStore1Component,
    UnknownStageComponent,
    AuthenticatorPush3Component,
    AuthenticatorPush4Component,
    AuthenticatorPush5Component,
    AuthenticatorPushRegistration2Component,
    AuthenticatorPushRegistration3Component,
    AuthenticatorPushRegistration4Component,
    AuthenticatorPushRegistration5Component,
    AuthenticatorRedirectComponent,
    NotFoundComponent,
    ExchanceCodeComponent
  ]
})
export class LoginDynamicStagesModule {}
