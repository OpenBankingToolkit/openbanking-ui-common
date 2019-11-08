import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import debug from 'debug';

import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';

const log = debug('ForgerockCustomerCanAccessGuard');

@Injectable()
export class ForgerockCustomerCanAccessGuard implements CanLoad, CanActivate {
  blacklist: string[] = this.configService.get('routeDenyList', []);

  constructor(private router: Router, private configService: ForgerockConfigService) {}

  // use on async route that we want to prevent from loading
  canLoad(route: Route): boolean {
    const currentUrl = route.path;
    log('canLoad', currentUrl, this.blacklist);
    return this.isAccessGranted(currentUrl);
  }

  // use on route that are loaded but wnt to prevent a children from access
  // example: /dashboard/tpp OK but /dashboard/account DENIED
  // use canActivate in that case
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUrl = state.url.substring(1);
    log('canActivate', currentUrl, this.blacklist);
    return this.isAccessGranted(currentUrl);
  }

  isAccessGranted(currentUrl) {
    if (this.blacklist.includes(currentUrl)) {
      this.router.navigate(['/404']);
      return false;
    }
    return true;
  }
}
