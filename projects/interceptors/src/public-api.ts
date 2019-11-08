/*
 * Public API Surface of interceptors
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TimeoutInterceptor, FORGEROCK_HTTP_TIMEOUT_TOKEN, DEFAULT_HTTP_TIMEOUT } from './lib/httpTimeout';
export * from './lib/httpTimeout';

export const ForgerockInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
  { provide: FORGEROCK_HTTP_TIMEOUT_TOKEN, useValue: DEFAULT_HTTP_TIMEOUT }
];
