import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.reason }}</h1>
    <mat-dialog-content> {{ data.message }} </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-flat-button color="primary" (click)="onNoClick()" tabindex="2">
        Ok
      </button>
    </mat-dialog-actions>
  `
})
export class FormDialogComponent {
  constructor(public dialogRef: MatDialogRef<FormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
