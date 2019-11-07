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

import {
  ChoiceCallbackComponent,
  ConfirmationCallbackComponent,
  FormButtonComponent,
  FormDialogComponent,
  HiddenValueCallbackComponent,
  NameCallbackComponent,
  PasswordCallbackComponent,
  RedirectCallbackComponent,
  TextOutputCallbackComponent
} from '.';

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
    NameCallbackComponent,
    PasswordCallbackComponent,
    HiddenValueCallbackComponent,
    TextOutputCallbackComponent,
    ConfirmationCallbackComponent,
    ChoiceCallbackComponent,
    RedirectCallbackComponent,
    FormButtonComponent,
    FormDialogComponent
  ],
  entryComponents: [
    NameCallbackComponent,
    PasswordCallbackComponent,
    HiddenValueCallbackComponent,
    TextOutputCallbackComponent,
    ConfirmationCallbackComponent,
    ChoiceCallbackComponent,
    RedirectCallbackComponent,
    FormButtonComponent,
    FormDialogComponent
  ]
})
export class LoginDynamicInputsModule {}
