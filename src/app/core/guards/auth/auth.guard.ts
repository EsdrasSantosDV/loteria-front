import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthKeycloakService } from '../../keycloak/keycloak.auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthKeycloakService);
  if (authService.isLoggedIn()) {
    return true;
  }
  authService.redirectToLoginPage().then();
  return false;
};
