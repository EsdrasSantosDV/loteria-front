import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthKeycloakService } from '../../keycloak/keycloak.auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthKeycloakService);
  const authToken = authService.getToken();
  if (!authToken) {
    return next(req);
  }
  const authReq = req.clone({
    headers: new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    }),
  });
  return next(authReq);
};
