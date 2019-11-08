import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { throwError } from 'rxjs';
import { of } from 'rxjs';

import { OIDCLogoutEffects } from './logout';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { CookieModule } from 'ngx-cookie';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ForgerockAuthRedirectOIDCService } from '../../oidc.service';
import { ForgerockOIDCConfigToken } from '../../tokens';
import {
  ForgerockOIDCLogoutRequestAction,
  ForgerockOIDCLogoutErrorAction,
  ForgerockOIDCLogoutSuccessAction
} from '../reducers/logout';

describe('LogoutEffect', () => {
  let effects: OIDCLogoutEffects;
  let actions: Observable<any>;
  let apiService: ForgerockAuthRedirectOIDCService;
  let router: Router;
  let ApiServiceSpy;
  let routerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CookieModule.forRoot(), RouterTestingModule.withRoutes([]), CommonModule],
      providers: [
        {
          provide: ForgerockOIDCConfigToken,
          useValue: {
            backendURL: 'https://test.com'
          }
        },
        ForgerockAuthRedirectOIDCService,
        OIDCLogoutEffects,
        CookieService,
        provideMockActions(() => actions)
      ]
    });
    apiService = TestBed.get(ForgerockAuthRedirectOIDCService);
    router = TestBed.get(Router);
    effects = TestBed.get(OIDCLogoutEffects);
  });

  it('should return Success action', async(() => {
    ApiServiceSpy = spyOn(apiService, 'logout').and.returnValue(of(true));
    routerSpy = spyOn(router, 'navigate');

    actions = new ReplaySubject(1);
    actions.next(new ForgerockOIDCLogoutRequestAction());

    effects.request$.subscribe(result => {
      expect(ApiServiceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/session-lost']);
      expect(result).toEqual(new ForgerockOIDCLogoutSuccessAction());
    });
  }));

  it('should return Error action', async(() => {
    ApiServiceSpy = spyOn(apiService, 'logout').and.returnValue(throwError('eee'));

    actions = new ReplaySubject(1);
    actions.next(new ForgerockOIDCLogoutRequestAction());

    effects.request$.subscribe(result => {
      expect(ApiServiceSpy).toHaveBeenCalled();
      expect(result).toEqual(new ForgerockOIDCLogoutErrorAction());
    });
  }));
});
