import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ForgerockMainLayoutNavigationService } from '../../navigation.service';
import { IForgerockMainLayoutNavigationItem } from '../../../models';

@Component({
  // tslint:disable-next-line
  selector: 'fuse-nav-vertical-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss']
})
export class FuseNavVerticalCollapsableComponent implements OnInit, OnDestroy {
  @Input() item: IForgerockMainLayoutNavigationItem;

  @HostBinding('class') classes = 'nav-collapsable nav-item';

  @HostBinding('class.open') public isOpen = false;

  private _unsubscribeAll: Subject<any>;

  constructor(private _fuseNavigationService: ForgerockMainLayoutNavigationService, private _router: Router) {
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
      .subscribe((event: NavigationEnd) => {
        if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
          this.expand();
        } else {
          this.collapse();
        }
      });

    this._fuseNavigationService.onItemCollapsed.pipe(takeUntil(this._unsubscribeAll)).subscribe(clickedItem => {
      if (clickedItem && clickedItem.children) {
        if (this.isChildrenOf(this.item, clickedItem)) {
          return;
        }

        if (this.isUrlInChildren(this.item, this._router.url)) {
          return;
        }

        if (this.item !== clickedItem) {
          this.collapse();
        }
      }
    });

    if (this.isUrlInChildren(this.item, this._router.url)) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Toggle collapse
   *
   * @param ev
   */
  toggleOpen(ev): void {
    ev.preventDefault();

    this.isOpen = !this.isOpen;

    this._fuseNavigationService.onItemCollapsed.next(this.item);
    this._fuseNavigationService.onItemCollapseToggled.next();
  }

  /**
   * Expand the collapsable navigation
   */
  expand(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this._fuseNavigationService.onItemCollapseToggled.next();
  }

  /**
   * Collapse the collapsable navigation
   */
  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this._fuseNavigationService.onItemCollapseToggled.next();
  }

  isChildrenOf(parent, item): boolean {
    if (!parent.children) {
      return false;
    }

    if (parent.children.indexOf(item) !== -1) {
      return true;
    }

    for (const children of parent.children) {
      if (children.children) {
        return this.isChildrenOf(children, item);
      }
    }
  }

  isUrlInChildren(parent, url): boolean {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (this.isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
        return true;
      }
    }

    return false;
  }
}
