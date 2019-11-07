import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';

import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';

@Injectable({
  providedIn: 'root'
})
export class ForgerockGDPRService {
  static gdprDeniedPage = 'access-denied';

  constructor(
    private configService: ForgerockConfigService,
    private ccService: NgcCookieConsentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
      if (event.status === 'allow' && window.location.pathname === '/' + ForgerockGDPRService.gdprDeniedPage) {
        const { returnUrl } = this.route.snapshot.queryParams;
        this.router.navigateByUrl(decodeURIComponent(returnUrl));
      } else if (event.status === 'deny' && window.location.pathname !== '/' + ForgerockGDPRService.gdprDeniedPage) {
        const options: NavigationExtras = {
          queryParams: {
            returnUrl: encodeURIComponent(router.routerState.snapshot.url)
          }
        };
        this.router.navigate(['/' + ForgerockGDPRService.gdprDeniedPage], options);
      }
    });
  }

  init(): void {
    this.ccService.getConfig().cookie.domain = this.configService.get('cookieDomain');
    this.ccService.destroy(); //remove previous cookie bar (with default messages)
    this.ccService.init(this.ccService.getConfig()); // update config with translated messages
  }

  get hasAnswered() {
    return this.ccService.hasAnswered();
  }

  get hasConsented() {
    return this.ccService.hasConsented();
  }
}
