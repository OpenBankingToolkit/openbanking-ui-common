import { Component, HostBinding, Input } from '@angular/core';
import { IForgerockMainLayoutNavigationItem } from '../../../models';

@Component({
  // tslint:disable-next-line
  selector: 'fuse-nav-vertical-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class FuseNavVerticalItemComponent {
  @HostBinding('class') classes = 'nav-item';

  @Input() item: IForgerockMainLayoutNavigationItem;

  constructor() {}
}
