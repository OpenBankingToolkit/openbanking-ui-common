import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { ForgerockGDPRService } from './gdpr.service';

@Injectable({
  providedIn: 'root'
})
export class ForegerockGDPRConsentGuard implements CanActivate {
  constructor(protected gdprService: ForgerockGDPRService, protected router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.gdprService.hasAnswered && !this.gdprService.hasConsented) {
      const options: NavigationExtras = {
        queryParams: {
          returnUrl: encodeURIComponent(state.url)
        }
      };
      this.router.navigate(['/' + ForgerockGDPRService.gdprDeniedPage], options);
    }
    return true;
  }
}
