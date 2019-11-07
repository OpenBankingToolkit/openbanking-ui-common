import { Component, Input, ViewEncapsulation } from '@angular/core';

import { IForgerockMainLayoutNavigation, IForgerockMainLayoutConfig } from '../../models';

@Component({
  // tslint:disable-next-line
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component {
  @Input() config: IForgerockMainLayoutConfig;
  @Input() navigation: IForgerockMainLayoutNavigation;

  constructor() {}
}
