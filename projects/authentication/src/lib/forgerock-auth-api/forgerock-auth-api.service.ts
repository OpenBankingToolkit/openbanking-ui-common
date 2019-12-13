import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import _get from 'lodash-es/get';

import { encodeQueryData } from '@forgerock/openbanking-ngx-common/utils';
import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgerockAuthApiService {
  get sessionInfoUrl() {
    return `${this.configService.get('authenticationServer')}/json/sessions?_action=getSessionInfo`;
  }

  constructor(private http: HttpClient, private configService: ForgerockConfigService, private router: Router) {}

  login(realm = this.configService.get('defaultRealm'), body, queries = {}) {
    return this.http.post(
      `${this.configService.get('authenticationServer')}/json/realms/root/realms${prefixRealm(
        realm
      )}/authenticate${encodeQueryData(queries)}`,
      body,
      getDefaultHeaders({
        'Accept-API-Version': 'protocol=1.0,resource=2.1'
      })
    );
  }

  logout() {
    return this.http.post(
      `${this.configService.get('authenticationServer')}/json/sessions/?_action=logout`,
      {},
      getDefaultHeaders({
        'Accept-API-Version': 'protocol=1.0,resource=2.0'
      })
    );
  }

  loginSuccessRedirection({ goto, returnUrl, realm }: Params) {
    if (goto) {
      const redirection = new URL(goto);
      if (redirection.hostname === window.location.hostname) {
        // if the goto redirects to the same app, we redirect with the router instead
        // to avoid reloading the app
        this.router.navigateByUrl(redirection.pathname + redirection.search);
      } else {
        window.location.href = goto;
      }
    } else if (returnUrl) {
      // returnUrl is a redirection when attempting to open a page that requires auth such as /profile
      this.router.navigateByUrl(decodeURIComponent(returnUrl));
    } else {
      const defaultRedirection =
        this.configService.get(`realmRedirections[${realm}]`) || this.configService.get('realmRedirections.default');

      this.router.navigateByUrl(defaultRedirection);
    }
  }

  getUserProfile(realm = this.configService.get('defaultRealm'), username = '') {
    return this.http.get(
      `${this.configService.get('authenticationServer')}/json/realms/root/realms${prefixRealm(
        realm
      )}/users/${username}`,
      getDefaultHeaders({
        'Accept-API-Version': 'protocol=1.0,resource=2.0'
      })
    );
  }

  updateUserProfile(realm = this.configService.get('defaultRealm'), username = '', body: any = {}) {
    return this.http.put(
      `${this.configService.get('authenticationServer')}/json/realms/root/realms${prefixRealm(
        realm
      )}/users/${username}`,
      body,
      getDefaultHeaders({
        'Accept-API-Version': 'protocol=1.0,resource=2.0'
      })
    );
  }

  updateUserPassword(realm = this.configService.get('defaultRealm'), username = '', body: any = {}) {
    return this.http.post(
      `${this.configService.get('authenticationServer')}/json/realms/root/realms${prefixRealm(
        realm
      )}/users/${username}?_action=changePassword`,
      body,
      getDefaultHeaders({
        'Accept-API-Version': 'protocol=1.0,resource=2.0'
      })
    );
  }

  register(realm = this.configService.get('defaultRealm'), values: any) {
    const request = {
      input: {
        user: {
          username: values.username,
          givenName: values.firstname,
          sn: values.lastname,
          mail: values.email,
          userPassword: values.password,
          inetUserStatus: 'Active'
        }
      }
    };
    return this.http.post(
      `${this.configService.get('authenticationServer')}/json/realms/root/realms${prefixRealm(
        realm
      )}/selfservice/userRegistration?_action=submitRequirements`,
      request,
      getDefaultHeaders({
        'Accept-API-Version': 'protocol=1.0,resource=1.0'
      })
    );
  }

  getSession(): Observable<any> {
    return this.http.post(
      this.sessionInfoUrl,
      {},
      getDefaultHeaders({
        'Accept-API-Version': 'protocol=1.0,resource=2.0'
      })
    );
  }

  isConnected(): Observable<boolean> {
    return this.getUserProfile().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}

function prefixRealm(realm: string = ''): string {
  return realm[0] === '/' ? realm : `/${realm}`;
}

function getDefaultHeaders(headers: { [key: string]: string } = {}) {
  return {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...headers
    })
  };
}
