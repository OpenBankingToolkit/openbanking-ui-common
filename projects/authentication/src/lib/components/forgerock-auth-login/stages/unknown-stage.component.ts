import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { StagesParentComponent } from './stages.parent.component';

@Component({
  selector: 'app-unknown-stage',
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="submit()">
      <ng-container
        *ngFor="let field of response.callbacks"
        dynamicField
        [config]="field"
        [authId]="response.authId"
        [group]="formGroup"
      >
      </ng-container>
      <div *ngIf="needsButton == true" fxLayout="column" fxLayoutAlign="center center">
        <button fxFill mat-flat-button type="submit" color="accent">
          {{ 'NEXT' | translate }}
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnknownStageComponent extends StagesParentComponent implements OnInit {
  needsButton: boolean;

  ngOnInit() {
    super.ngOnInit();

    this.response.callbacks.forEach(entry => {
      switch (entry.type) {
        case 'RedirectCallback':
        case 'ConfirmationCallback':
        case 'ChoiceCallback':
          this.needsButton = false;
          break;
        default:
          this.needsButton = true;
          break;
      }
    });
  }
}
