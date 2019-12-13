/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';
import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-redirect-callback',
  template: `
    <h3>Redirect...</h3>
  `
})
export class RedirectCallbackComponent implements Field, OnInit {
  authId: string;
  config: ICallback;
  group: FormGroup;
  redirectUrl: string;
  redirectMethod: string;
  trackingCookie: boolean;

  constructor(protected route: ActivatedRoute, private conf: ForgerockConfigService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const goto = params['goto'];

      this.config.output.forEach(entry => {
        switch (entry.name) {
          case 'redirectUrl':
            this.redirectUrl = entry.value;
            break;
          case 'redirectMethod':
            this.redirectMethod = entry.value;
            break;
          case 'trackingCookie':
            this.trackingCookie = entry.value;
            break;
        }
      });

      if (this.trackingCookie) {
        var date = new Date();
        date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
        var pathArray = location.href.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url = protocol + '//' + host;

        //Rebuilding the URI to workaround AM bug: goto wasn't url encoded
        document.cookie =
          'ORIG_URL=' +
          url +
          '/login?goto=' +
          encodeURIComponent(goto) +
          '; path=/;domain=' +
          `${this.conf.get('cookieDomain')}` +
          ';';
        localStorage.setItem('AUTH_ID', this.authId);
      }

      window.location.href = this.redirectUrl;
    });
  }

  onChange(e) {
    this.config.input[0].value = e.target.value;
  }
}
