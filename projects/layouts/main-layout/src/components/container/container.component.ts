import { Component, OnDestroy, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ForgerockMainLayoutConfigService } from '../../main-layout.config.service';
import { IForgerockMainLayoutConfig } from '../../models';

@Component({
  // tslint:disable-next-line
  selector: 'layout-container',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      :host:not(.fluid) {
        margin: 0 auto;
      }
    `
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class LayoutContainerComponent implements OnInit, OnDestroy {
  public layoutConfig: IForgerockMainLayoutConfig;

  @HostBinding('style.max-width.px')
  width: number | undefined;
  @HostBinding('class.fluid') isFluid: boolean;

  private _unsubscribeAll: Subject<any>;

  constructor(private _configService: ForgerockMainLayoutConfigService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._configService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.width = config.width;
      this.isFluid = !config.width;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
