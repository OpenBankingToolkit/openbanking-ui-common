import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfirmationCallbackComponent } from './confirmation-callback.component';
import { ChoiceCallbackComponent } from './choice-callback.component';
import { NameCallbackComponent } from './name-callback.component';
import { PasswordCallbackComponent } from './password-callback.component';
import { HiddenValueCallbackComponent } from './hiddenvalue-callback.component';
import { TextOutputCallbackComponent } from './textoutput-callback.component';
import { RedirectCallbackComponent } from './redirect-callback.component';
import { FormButtonComponent } from './form-button.component';
import { FormDialogComponent } from './form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [
    ChoiceCallbackComponent,
    ConfirmationCallbackComponent,
    NameCallbackComponent,
    PasswordCallbackComponent,
    HiddenValueCallbackComponent,
    TextOutputCallbackComponent,
    RedirectCallbackComponent,
    FormButtonComponent,
    FormDialogComponent
  ],
  entryComponents: [
    ChoiceCallbackComponent,
    ConfirmationCallbackComponent,
    NameCallbackComponent,
    PasswordCallbackComponent,
    HiddenValueCallbackComponent,
    TextOutputCallbackComponent,
    RedirectCallbackComponent,
    FormButtonComponent,
    FormDialogComponent
  ]
})
export class LoginDynamicInputsModule {}
