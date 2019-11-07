import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'forgerock-alert',
  // styleUrls: ['./forgerock-alert.component.scss'],
  template: `
    <ng-content></ng-content>
  `
})
export class ForgerockAlertComponent {
  @HostBinding('class') @Input() color: 'primary' | 'accent' | 'warn' | '' = '';

  constructor() {}
}
