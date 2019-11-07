import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginDynamicInputsModule } from '../dynamic-inputs/dynamic-inputs.module';
import {
  AuthenticatorPush3Component,
  AuthenticatorPush4Component,
  AuthenticatorPush5Component,
  AuthenticatorPushRegistration2Component,
  AuthenticatorPushRegistration3Component,
  AuthenticatorPushRegistration4Component,
  AuthenticatorPushRegistration5Component,
  AuthenticatorRedirectComponent,
  DataStore1Component,
  NotFoundComponent,
  StagesComponent,
  UnknownStageComponent
} from '.';
import { DynamicFieldDirective, ProgrammaticInputFireEventDirective } from '../directives';
import { ExchanceCodeComponent } from './exchance-code.component';

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
    DynamicFieldDirective,
    ProgrammaticInputFireEventDirective,
    NotFoundComponent,
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
