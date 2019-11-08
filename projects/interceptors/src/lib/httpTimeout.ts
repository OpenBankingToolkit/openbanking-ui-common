import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

export const FORGEROCK_HTTP_TIMEOUT_TOKEN = new InjectionToken<number>('appTimeout');
export const DEFAULT_HTTP_TIMEOUT = 30000;

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject(FORGEROCK_HTTP_TIMEOUT_TOKEN) protected appTimeout: number) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // timeout can be changed per call via timeout header
    // { headers: new HttpHeaders({ timeout: `${20000}` }) }
    const timeoutValue = Number(req.headers.get('timeout')) || this.appTimeout;

    return next.handle(req).pipe(timeout(timeoutValue));
  }
}
