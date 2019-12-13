import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TranslateModule } from '@ngx-translate/core';

import { ForgerockConfirmDialogModule } from '@forgerock/openbanking-ngx-common/components/forgerock-confirm-dialog';
import { ForgerockCustomerLogoModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-logo';

import { ForgerockAuthRegisterComponent } from './forgerock-auth-register.component';
import { ForgerockMessagesModule } from '@forgerock/openbanking-ngx-common/services/forgerock-messages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('app:forgerock ForgerockAuthRegisterComponent', () => {
  let component: ForgerockAuthRegisterComponent;
  let fixture: ComponentFixture<ForgerockAuthRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgerockAuthRegisterComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
        TranslateModule.forRoot({}),
        NoopAnimationsModule,
        CommonModule,
        ForgerockConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ForgerockCustomerLogoModule,
        ForgerockMessagesModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgerockAuthRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
