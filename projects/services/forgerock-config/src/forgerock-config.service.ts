import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import _merge from 'lodash-es/merge';
import _get from 'lodash-es/get';

@Injectable({
  providedIn: 'root'
})
export class ForgerockConfigService {
  private _config: any = {};

  constructor(private http: HttpClient) {}

  fetchAndMerge(defaultEnvironement: any = {}) {
    return this.http
      .get('deployment-settings.json')
      .toPromise()
      .then(json => (this._config = _merge(defaultEnvironement, json)))
      .catch(() => (this._config = defaultEnvironement));
  }

  get(key: string, defaultReturn?: any) {
    return _get(this.config, key, defaultReturn);
  }

  get config() {
    return this._config;
  }
}
