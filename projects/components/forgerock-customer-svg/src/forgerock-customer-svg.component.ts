import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'forgerock-customer-logo',
  template: `
    <div [innerHTML]="svg$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockCustomerSVGComponent implements OnInit {
  defaultImgSrc: string;
  svg$: Observable<SafeHtml>;
  width: number | string;
  height: number | string;
  stream$: Observable<string>;

  constructor(
    protected store: Store<any>,
    protected configService: ForgerockConfigService,
    protected sanitizer: DomSanitizer,
    protected http: HttpClient
  ) {}

  ngOnInit() {
    this.svg$ = this.stream$.pipe(
      mergeMap(img => (img ? of(img) : this.http.get(this.defaultImgSrc, { responseType: 'text' }))),
      map(img => {
        const div = document.createElement('div');
        div.innerHTML = img;
        const svg = div.querySelector('svg');
        svg.setAttribute('width', String(this.width));
        svg.setAttribute('height', String(this.height));
        // IE11 hack: https://stackoverflow.com/questions/45375945/outerhtml-undefined-in-ie
        return svg.outerHTML || new XMLSerializer().serializeToString(svg);
      }),
      map(img => this.sanitizer.bypassSecurityTrustHtml(img))
    );
  }
}
