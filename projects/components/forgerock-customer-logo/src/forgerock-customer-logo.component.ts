import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { ForgerockConfigService } from 'ob-ui-libs//services/forgerock-config';
// import { selectors } from 'forgerock/src/app/modules/customization/store/reducers/files';
import { ForgerockCustomerSVGComponent } from 'ob-ui-libs/components/forgerock-customer-svg';

@Component({
  selector: 'forgerock-customer-logo',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerLogoComponent extends ForgerockCustomerSVGComponent implements OnInit {
  defaultImgSrc = './assets/logos/logo.svg';
  svg$: Observable<SafeHtml>;
  // stream$: Observable<string> = this.store.pipe(select(selectors.selectLogo));
  stream$: Observable<string> = of('');
  @Input() width: number | string = this.configService.get('client.logoWidth', 70);
  @Input() height: number | string = this.configService.get('client.logoHeight', '100%');

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
  }
}
