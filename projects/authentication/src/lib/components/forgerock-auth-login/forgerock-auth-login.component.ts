import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import debug from 'debug';
import _get from 'lodash-es/get';

import { withErrorHandling } from 'ob-ui-libs/utils';
import { ForgerockMessagesService } from 'ob-ui-libs/services/forgerock-messages';
import { IConfigClient } from '../../models';
import { ApiReponses } from '../../models';
import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';
import { ForgerockAuthApiService } from '../../forgerock-auth-api/forgerock-auth-api.service';

const log = debug('ForgerockAuthLogin:ForgerockAuthLoginComponent');

@Component({
  selector: 'forgerock-auth-login',
  templateUrl: './forgerock-auth-login.component.html',
  styleUrls: ['./forgerock-auth-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockAuthLoginComponent implements OnInit {
  response: ApiReponses.AuthLoginResponse;
  error: Error;
  client: IConfigClient = this.configService.get('client');

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
