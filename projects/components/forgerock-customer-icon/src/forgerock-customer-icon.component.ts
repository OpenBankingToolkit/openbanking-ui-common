import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { ForgerockConfigService } from 'ob-ui-libs//services/forgerock-config';
// import { selectors } from 'forgerock/src/app/modules/customization/store/reducers/files';
import { ForgerockCustomerSVGComponent } from 'ob-ui-libs/components/forgerock-customer-svg';

@Component({
  selector: 'forgerock-customer-icon',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      :host div {
        display: flex;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerIconComponent extends ForgerockCustomerSVGComponent implements OnInit {
  defaultImgSrc = './assets/logos/icon.svg';
  svg$: Observable<SafeHtml>;
  // stream$: Observable<string> = this.store.pipe(select(selectors.selectIcon));
  stream$: Observable<string> = of('');
  @HostBinding('style.width.px')
  @Input()
  width: number | string = this.configService.get('client.iconWidth', 50);

  @HostBinding('style.height.px')
  @Input()
  height: number | string = this.configService.get('client.iconHeight', 50);

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {
    super(store, configService, sanitizer, http);
  }
}
