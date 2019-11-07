import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const defaultSnackbarOptions = {
  duration: 5000
};

@Injectable()
export class ForgerockMessagesService {
  constructor(private snackBar: MatSnackBar) {}

  error(text = 'Something Wrong happened', action = '', options = defaultSnackbarOptions) {
    this.snackBar.open(text, action, options);
  }

  info(text, action = '', options = defaultSnackbarOptions) {
    this.snackBar.open(text, action, options);
  }

  success(text = 'Success', action = '', options = defaultSnackbarOptions) {
    this.snackBar.open(text, action, options);
  }
}
