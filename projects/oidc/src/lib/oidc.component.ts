import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import _get from 'lodash-es/get';
import { map, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';
import { ForgerockAuthRedirectOIDCService } from './oidc.service';

@Component({
  selector: 'forgerock-auth-redirect-oidc',
  template: `
    <mat-progress-bar
      [style.visibility]="isLoading ? 'visible' : 'hidden'"
      mode="indeterminate"
      color="accent"
    ></mat-progress-bar>
    <forgerock-alert *ngIf="error" color="warn">{{ error }}</forgerock-alert>
  `,
  styles: []
})
export class ForgerockAuthRedirectOIDCComponent implements OnInit {
  public isLoading = false;
  public error = '';

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected configService: ForgerockConfigService,
    protected authService: ForgerockAuthRedirectOIDCService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.isLoading = true;
    this.authService
      .login(params)
      .pipe(
        map(data => this.router.navigate([data.originalRequest.toString()])),
        catchError((er: HttpErrorResponse | Error) => {
          this.error = _get(er, 'error.Message') || _get(er, 'error.message') || _get(er, 'message') || er;
          return of(er);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
