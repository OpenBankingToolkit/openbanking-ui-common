import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ForgerockMainLayoutConfigService } from '../../../../main-layout.config.service';
import { ForgerockMainLayoutNavigationService } from '../../../../navigation/navigation.service';
import { ForgerockLayoutSidebarService } from '../../../../sidebar/sidebar.service';
import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';

@Component({
  // tslint:disable-next-line
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
  fuseConfig: any;
  // fusePerfectScrollbarUpdateTimeout: any;
  navigation: any;
  clientName: string = this.configService.get('client.name');

  // private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: ForgerockMainLayoutConfigService,
    private _fuseNavigationService: ForgerockMainLayoutNavigationService,
    private _fuseSidebarService: ForgerockLayoutSidebarService,
    private _router: Router,
    private configService: ForgerockConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }
  /**
   * On init
   */
  ngOnInit(): void {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this._fuseSidebarService.getSidebar('navbar')) {
          this._fuseSidebarService.getSidebar('navbar').close();
        }
      });

    this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.fuseConfig = config;
    });

    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // if (this.fusePerfectScrollbarUpdateTimeout) {
    //   clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
    // }

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle sidebar opened status
   */
  toggleSidebarOpened(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }
}
