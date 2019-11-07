import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CookieModule } from 'ngx-cookie';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { LoginDynamicStagesModule } from './stages/stages.module';
import { ForgerockMessagesModule } from 'ob-ui-libs/services/forgerock-messages';
import { ForgerockAuthApiModule } from '../../forgerock-auth-api/forgerock-auth-api.module';
import { ForgerockConfigModule } from 'ob-ui-libs/services/forgerock-config';
import { ForgerockCustomerLogoModule } from 'ob-ui-libs/components/forgerock-customer-logo';

import { ForgerockAuthLoginComponent } from './forgerock-auth-login.component';

describe('app:forgerock ForgerockAuthLoginComponent', () => {
  let component: ForgerockAuthLoginComponent;
  let fixture: ComponentFixture<ForgerockAuthLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgerockAuthLoginComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
        CommonModule,
        TranslateModule.forRoot({}),
        LoginDynamicStagesModule,
        CookieModule.forRoot(),
        MatCardModule,
        MatProgressBarModule,
        ForgerockMessagesModule,
        ForgerockAuthApiModule,
        ForgerockConfigModule,
        ForgerockCustomerLogoModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgerockAuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
