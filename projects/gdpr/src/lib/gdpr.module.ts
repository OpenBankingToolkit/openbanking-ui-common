import { NgModule } from '@angular/core';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { CookieModule } from 'ngx-cookie';
import { TranslateModule } from '@ngx-translate/core';

import { ForgerockGDPRService } from './gdpr.service';
import { ForegerockGDPRConsentGuard } from './gdpr.guard.service';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  content: {
    link: ''
  },
  position: 'bottom-right',
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  imports: [TranslateModule, CookieModule, NgcCookieConsentModule.forRoot(cookieConfig)],
  providers: [ForgerockGDPRService, ForegerockGDPRConsentGuard]
})
export class ForgerockGDPRModule {}
