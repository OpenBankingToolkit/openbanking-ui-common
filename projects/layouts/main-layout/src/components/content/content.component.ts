import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'content',
  template: `
    <layout-container
      ><div class="outlet-wrapper">
        <router-outlet *ngIf="true"></router-outlet>
      </div>
    </layout-container>
  `,
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent {
  constructor() {}
}
