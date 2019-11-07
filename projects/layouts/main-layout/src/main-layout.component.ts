import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import _kebabCase from 'lodash-es/kebabCase';
import { DOCUMENT } from '@angular/common';

import { ForgerockMainLayoutConfigService } from './main-layout.config.service';
import { ForgerockMainLayoutNavigationService } from './navigation/navigation.service';
import { IForgerockMainLayoutConfig, IForgerockMainLayoutNavigation } from './models';

@Component({
  selector: 'forgerock-main-layout',
  template: `
    <!-- VERTICAL LAYOUT 1 -->
    <ng-container *ngIf="config$ | async as config">
      <vertical-layout-1
        [config]="config"
        [navigation]="(navigation$ | async).navigation"
        *ngIf="config.style === 'vertical-layout-1'"
      ></vertical-layout-1>
      <horizontal-layout-1
        [config]="config"
        [navigation]="(navigation$ | async).navigation"
        *ngIf="config.style === 'horizontal-layout-1'"
      ></horizontal-layout-1>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockMainLayoutComponent implements OnInit, OnDestroy {
  config$: Observable<IForgerockMainLayoutConfig> = this.configService.config;
  navigation$ = this.navigationService.onNavigationChanged;
  private _unsubscribeAll: Subject<any> = new Subject();
  private latestPathnameClass = '';

  constructor(
    private configService: ForgerockMainLayoutConfigService,
    private navigationService: ForgerockMainLayoutNavigationService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {
    this.router.events.pipe(takeUntil(this._unsubscribeAll)).subscribe(val => {
      if (val instanceof NavigationEnd) {
        const pathnameClass = _kebabCase(window.location.pathname) || 'root';
        if (this.latestPathnameClass) {
          this.document.body.classList.remove(this.latestPathnameClass);
        }
        this.document.body.classList.add(pathnameClass);
        this.latestPathnameClass = pathnameClass;
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
