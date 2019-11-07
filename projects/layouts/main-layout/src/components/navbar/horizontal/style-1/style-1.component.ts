import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ForgerockMainLayoutNavigationService } from '../../../../navigation/navigation.service';

@Component({
  // tslint:disable-next-line
  selector: 'navbar-horizontal-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarHorizontalStyle1Component implements OnInit, OnDestroy {
  navigation: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _fuseNavigationService: ForgerockMainLayoutNavigationService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
