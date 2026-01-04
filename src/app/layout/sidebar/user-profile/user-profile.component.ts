import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { environment } from "../../../../environments/environment";
import Keycloak from "keycloak-js";
import { CapitalizeFirstLetterPipe } from "../../../shared/pipes/capitalize-first-letter.pipe";

@Component({
  selector: "app-user-profile",
  imports: [CapitalizeFirstLetterPipe],
  template: `
    <div class="p-4 border-t border-border/50">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <span class="text-muted-foreground text-xl">👤</span>
        </div>
        <div class="flex-1">
          <p class="font-medium text-sm">
            {{ userName() | capitalizeFirstLetter }}
          </p>
          <button
            (click)="handleAuthAction()"
            class="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {{ authActionLabel() }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class UserProfileComponent implements OnInit {
  private readonly keycloak = inject(Keycloak);
  userName = signal<string>("");

  async ngOnInit() {
    if (this.keycloak.authenticated) {
      const profile = await this.keycloak.loadUserProfile();
      this.userName.set(profile?.username || "");
    }
  }

  authActionLabel = computed(() => {
    return this.keycloak.authenticated ? "Sair" : "Entrar";
  });

  handleAuthAction() {
    if (this.keycloak.authenticated) {
      this.keycloak.logout();
    } else {
      this.keycloak.login({
        redirectUri: environment.keycloak.redirectUri,
      });
    }
  }
}
