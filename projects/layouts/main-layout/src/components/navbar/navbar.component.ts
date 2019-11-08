import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ForgerockMainLayoutConfigService } from '../../main-layout.config.service';
import { IForgerockMainLayoutConfig } from '../../models';

@Component({
  // tslint:disable-next-line
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  _variant = 'vertical-style-1';
  private _unsubscribeAll: Subject<any>;
  public layoutConfig: IForgerockMainLayoutConfig;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private configService: ForgerockMainLayoutConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }

  get variant(): string {
    return this._variant;
  }

  @Input()
  set variant(value: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, this.variant);

    this._variant = value;

    this._renderer.addClass(this._elementRef.nativeElement, value);
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this.configService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.layoutConfig = config;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
