import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import debug from 'debug';

import { ForgerockMainLayoutNavigationService } from './navigation.service';
import { IForgerockMainLayoutNavigationItem } from '../models';
import { ForgerockConfigService } from 'ob-ui-libs/services/forgerock-config';

const log = debug('ForgerockMainLayoutNavigationComponent');

@Component({
  // tslint:disable-next-line
  selector: 'fuse-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgerockMainLayoutNavigationComponent implements OnInit {
  @Input()
  layout = 'vertical';

  @Input()
  navigation: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseNavigationService: ForgerockMainLayoutNavigationService,
    private configService: ForgerockConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
    this.navigation = this.filterNavigationWithRouteDenyList(
      this.navigation || this._fuseNavigationService.getCurrentNavigation()
    );

    this._fuseNavigationService.onNavigationChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.navigation = this.filterNavigationWithRouteDenyList(this._fuseNavigationService.getCurrentNavigation());
    });
  }

  filterNavigationWithRouteDenyList(
    navigation: IForgerockMainLayoutNavigationItem[]
  ): IForgerockMainLayoutNavigationItem[] {
    const filter = <string[]>this.configService.get('routeDenyList', []);
    log('routeDenyList', filter);
    log('navigation', navigation);
    return navigation.filter(menu => filterTest(menu, filter));
  }
}

function filterTest(navItem: IForgerockMainLayoutNavigationItem, filters: string[]) {
  if (navItem.children) {
    return (navItem.children = navItem.children.filter((navItemChildren: IForgerockMainLayoutNavigationItem) =>
      filterTest(navItemChildren, filters)
    )).length;
  }
  return !filters.includes(navItem.url.substring(1));
}
