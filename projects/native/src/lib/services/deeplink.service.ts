import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ForgerockNativeDeepLinkService {
  constructor(private router: Router, private ngZone: NgZone) {}

  async init() {
    App.addListener('appStateChange', (state: AppState) => {
      // state.isActive contains the active state
      console.log('App state changed. Is active?', state.isActive);
    });
    // let ret = await App.canOpenUrl({ url: 'com.getcapacitor.myapp' });
    // console.log('Can open url: ', ret.value);

    // ret = await App.openUrl({ url: 'com.getcapacitor.myapp://page?id=ionicframework' });
    // console.log('Open url response: ', ret);

    const ret = await App.getLaunchUrl();
    if (ret && ret.url) {
      console.log('App opened with URL: ' + ret.url);
    }
    console.log('Launch url: ', ret);

    App.addListener('appUrlOpen', (data: any) => {
      console.log('App opened with URL: ' + data.url);
      const url = new URL(data.url);
      console.log(url, url.pathname + url.search);
      console.warn('isInAngularZone', NgZone.isInAngularZone());
      this.ngZone.run(() => {
        console.warn('isInAngularZone', NgZone.isInAngularZone());
        this.router.navigateByUrl(url.pathname + url.search, {
          skipLocationChange: true
        });
      });
    });

    App.addListener('appRestoredResult', (data: any) => {
      console.log('Restored state:', data);
    });
  }
}
