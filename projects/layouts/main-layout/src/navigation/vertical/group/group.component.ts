import { Component, HostBinding, Input } from '@angular/core';
import { IForgerockMainLayoutNavigationItem } from '../../../models';

@Component({
  // tslint:disable-next-line
  selector: 'fuse-nav-vertical-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class FuseNavVerticalGroupComponent {
  @HostBinding('class') classes = 'nav-group nav-item';

  @Input() item: IForgerockMainLayoutNavigationItem;

  /**
   * Constructor
   */
  constructor() {}
}
