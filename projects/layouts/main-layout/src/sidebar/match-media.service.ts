import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForegerockLayoutMatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _observableMedia: ObservableMedia) {
    this.activeMediaQuery = '';

    this._init();
  }

  private _init(): void {
    this._observableMedia.subscribe((change: MediaChange) => {
      if (this.activeMediaQuery !== change.mqAlias) {
        this.activeMediaQuery = change.mqAlias;
        this.onMediaChange.next(change.mqAlias);
      }
    });
  }
}
