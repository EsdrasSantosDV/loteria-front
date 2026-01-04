import { inject, Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthKeycloakService {
  readonly keycloakService = inject(KeycloakService);

  redirectToLoginPage(): Promise<void> {
    return this.keycloakService.login();
  }

  getUserName() {
    return this.keycloakService.getUsername();
  }

  async loadUserProfile(): Promise<KeycloakProfile> {
    return await this.keycloakService.loadUserProfile();
  }

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  getToken() {
    return this.keycloakService.getKeycloakInstance().token;
  }

  logout(): void {
    this.keycloakService.logout(environment.keycloak.postLogoutRedirectUri);
  }
}
