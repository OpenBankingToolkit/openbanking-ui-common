import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { StagesParentComponent } from './stages.parent.component';

@Component({
  selector: 'app-data-store1',
  template: `
    <h1>{{ 'STAGES.' + response.stage + '.TITLE' | translate }}</h1>
    <form [formGroup]="formGroup" (ngSubmit)="submit()">
      <ng-container *ngFor="let field of response.callbacks" dynamicField [config]="field" [group]="formGroup">
      </ng-container>
      <div fxLayout="column" fxLayoutAlign="center center">
        <button mat-flat-button type="submit" color="accent" [disabled]="formGroup.invalid">
          {{ 'SIGNIN' | translate }}
        </button>
      </div>
      <div class="footer">
        <p>
          {{ 'STAGES.' + response.stage + '.DONT_HAVE_ACCOUNT' | translate }}
          <a routerLink="/register" queryParamsHandling="preserve">{{ 'CREATE_ACCOUNT' | translate }}</a>
        </p>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataStore1Component extends StagesParentComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
