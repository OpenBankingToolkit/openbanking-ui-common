import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import debug from 'debug';
import _get from 'lodash-es/get';

import { withErrorHandling } from '@forgerock/openbanking-ngx-common/utils';
import { ForgerockMessagesService } from '@forgerock/openbanking-ngx-common/services/forgerock-messages';
import { IConfigClient } from '../../models';
import { ApiReponses } from '../../models';
import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';

const log = debug('ForgerockAuthLogin:ForgerockAuthLoginComponent');

@Component({
  selector: 'forgerock-auth-login',
  template: `
    <mat-card>
      <mat-card-content>
        <forgerock-customer-logo></forgerock-customer-logo>
        <mat-progress-bar *ngIf="!response && !error" mode="indeterminate" color="accent"></mat-progress-bar>
        <app-stages *ngIf="response" [response]="response" [client]="client" (formSubmit)="onSignin()"></app-stages>
      </mat-card-content>
      <mat-card-actions *ngIf="!disableRegistration">
        {{ 'DONT_HAVE_ACCOUNT' | translate }}
        <button color="accent" mat-button routerLink="/register" queryParamsHandling="preserve">
          {{ 'CREATE_ACCOUNT' | translate }}
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./forgerock-auth-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockAuthLoginComponent implements OnInit {
  response: ApiReponses.AuthLoginResponse;
  error: Error;
  client: IConfigClient = this.configService.get('client');
  disableRegistration: boolean = this.configService.get('featureFlags.disableRegistration', false);

  constructor(
    private api: ForgerockAuthApiService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private messages: ForgerockMessagesService,
    private configService: ForgerockConfigService
  ) {}

  ngOnInit() {
    // Get initial empty form
    this.signin().subscribe((data: any) => this.updateLoginForm(data), this.onLoginError);
  }

  displayError(er: string) {
    this.messages.error(er);
    this.error = new Error(er);
    this.cdr.detectChanges();
  }

  signin(authenticationResponse: ApiReponses.AuthLoginResponse = {}) {
    const { goto, realm, service } = this.route.snapshot.queryParams;

    return this.api
      .login(
        realm,
        authenticationResponse,
        authenticationResponse.code
          ? {
              goto,
              code: authenticationResponse.code,
              state: authenticationResponse.state
            }
          : service
          ? {
              authIndexType: 'service',
              authIndexValue: service,
              goto
            }
          : {
              goto
            }
      )
      .pipe(withErrorHandling);
  }

  public onSignin() {
    this.signin(this.response).subscribe(this.onLoginSuccess, this.onLoginError);
  }

  onLoginSuccess = data => {
    log('Success');

    if (!data.tokenId) {
      log('Next stage');
      this.updateLoginForm(data);
    } else {
      log('loginSuccessRedirection', this.route.snapshot.queryParams);
      this.api.loginSuccessRedirection(this.route.snapshot.queryParams);
    }
  };

  updateLoginForm(data: ApiReponses.AuthLoginResponse) {
    this.response = data;
    this.cdr.detectChanges();
  }

  onLoginError = (error: HttpErrorResponse) => {
    this.displayError(error.message);

    if (_get(error, 'error.detail.errorCode') === '110') {
      // Session timed out
      this.signin().subscribe(this.onLoginSuccess, this.onLoginError);
    }
  };
}
