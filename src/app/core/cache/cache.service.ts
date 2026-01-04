import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class CacheService {
  cache = new Map();
  maxAge = 30000;

  get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    return cached.response;
  }

  put(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - this.maxAge;
    this.cache.forEach((expiredEntry) => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
