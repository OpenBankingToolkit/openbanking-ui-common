import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ForgerockConfirmDialogModule } from '@forgerock/openbanking-ngx-common/components/forgerock-confirm-dialog';
import { ForgerockAuthProfileModule } from '../forgerock-auth-profile/forgerock-auth-profile.module';

import { ForgerockAuthPasswordComponent } from './forgerock-auth-password.component';

describe('app:forgerock ForgerockAuthPasswordComponent', () => {
  let component: ForgerockAuthPasswordComponent;
  let fixture: ComponentFixture<ForgerockAuthPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgerockAuthPasswordComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
        CommonModule,
        TranslateModule.forRoot({}),
        NoopAnimationsModule,
        ForgerockConfirmDialogModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        ForgerockAuthProfileModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgerockAuthPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
