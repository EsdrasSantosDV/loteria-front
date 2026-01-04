import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FooterComponent } from "../footer/footer.component";
import { GameService } from "../../core/singletons/services/game.service";

@Component({
  selector: "app-main-layout",
  imports: [CommonModule, RouterOutlet, SidebarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-background">
      <app-sidebar
        [selectedGame]="gameService.selectedGame$ | async"
      ></app-sidebar>

      <div class="lg:ml-64 relative">
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 py-6 max-w-4xl">
          <router-outlet></router-outlet>
          <app-footer></app-footer>
        </div>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {
  gameService = inject(GameService);
}
