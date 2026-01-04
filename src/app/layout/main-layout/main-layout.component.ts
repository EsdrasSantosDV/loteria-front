import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FooterComponent } from "../footer/footer.component";
import { GameService } from "../../features/lottery-game/services/game.service";

@Component({
  selector: "app-main-layout",
  imports: [CommonModule, RouterOutlet, SidebarComponent, FooterComponent],
  template: `
    <div class="h-screen bg-background flex overflow-hidden">
      <app-sidebar
        [selectedGame]="gameService.selectedGame$ | async"
      ></app-sidebar>

      <div class="flex-1 flex flex-col lg:ml-64 relative overflow-hidden">
        <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
            class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          ></div>
        </div>

        <div class="flex-1 overflow-y-auto relative z-10">
          <div
            class="container mx-auto px-4 pb-6 max-w-7xl min-h-full flex flex-col"
          >
            <div class="flex-1">
              <router-outlet></router-outlet>
            </div>
            <app-footer></app-footer>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {
  gameService = inject(GameService);
}
