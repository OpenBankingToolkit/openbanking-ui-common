import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field, ICallback } from '../../../models';

@Component({
  selector: 'app-confirmation-callback',
  template: `
    <div [formGroup]="group" fxLayout="column" fxLayoutAlign="center center">
      <ng-container *ngFor="let option of options; let i = index">
        <button
          *ngIf="option != 'null'"
          mat-button
          [ngClass]="{
            'mat-button': defaultOption !== i,
            'mat-flat-button': defaultOption === i
          }"
          color="accent"
          type="submit"
          (click)="open($event, i)"
        >
          {{ option }}
        </button>
      </ng-container>
    </div>
  `
})
export class ConfirmationCallbackComponent implements Field, OnInit {
  authId: string;
  config: ICallback;
  group: FormGroup;
  id: any = '';
  prompt: string;
  messageType: number;
  options: any;
  optionType: number;
  defaultOption: number;

  ngOnInit(): void {
    this.id = this.config.input[0].value;
    this.config.output.forEach(entry => {
      switch (entry.name) {
        case 'prompt':
          this.prompt = entry.value;
          break;
        case 'messageType':
          this.prompt = entry.value;
          break;
        case 'options':
          this.options = entry.value;
          break;
        case 'optionType':
          this.optionType = Number(entry.value);
          break;
        case 'defaultOption':
          this.defaultOption = Number(entry.value);
          break;
      }
    });
  }

  public open(event, item) {
    this.config.input[0].value = item;
  }
}
