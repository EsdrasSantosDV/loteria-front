import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

const getCachedResponse = (
  cache: Map<string, HttpResponse<unknown>>,
  req: HttpRequest<unknown>,
): HttpResponse<unknown> | null => {
  return cache.get(req.urlWithParams) || null;
};

const putCachedResponse = (
  cache: Map<string, HttpResponse<unknown>>,
  req: HttpRequest<unknown>,
  response: HttpResponse<unknown>,
) => {
  cache.set(req.urlWithParams, response);
};

export const cachingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  console.log('Request caching');
  const cache = new Map<string, HttpResponse<unknown>>();
  const cachedResponse = getCachedResponse(cache, req);
  if (cachedResponse) {
    return of(cachedResponse);
  }
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        putCachedResponse(cache, req, event);
      }
    }),
  );
};
