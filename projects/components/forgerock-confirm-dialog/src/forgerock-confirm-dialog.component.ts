import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title?: string;
  text?: string;
  yes?: string;
  no?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data?.title || 'Please confirm' }}</h2>
    <mat-dialog-content>{{ data?.text || 'Are you sure?' }}</mat-dialog-content>
    <mat-dialog-actions style="justify-content: flex-end;">
      <button mat-button id="confirm-dialog-cancel" [mat-dialog-close]="false">
        {{ data?.no || 'No' }}
      </button>
      <button mat-button id="confirm-dialog-submit" [mat-dialog-close]="true" color="accent" mat-raised-button>
        {{ data?.yes || 'Yes' }}
      </button>
    </mat-dialog-actions>
  `
})
export class ForgerockConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ForgerockConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
