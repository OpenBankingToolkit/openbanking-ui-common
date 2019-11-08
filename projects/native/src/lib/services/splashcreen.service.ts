import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ForgerockNativeSplashscreenService {
  constructor() {}

  hide() {
    SplashScreen.hide();
  }
}
