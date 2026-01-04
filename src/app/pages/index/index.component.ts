import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameService, GameType } from "../../services/game.service";
import { LotteryHeaderComponent } from "../../components/lottery-header/lottery-header.component";
import { GameSelectorComponent } from "../../components/game-selector/game-selector.component";
import { PrizeInfoComponent } from "../../components/prize-info/prize-info.component";
import { NumberGridComponent } from "../../components/number-grid/number-grid.component";
import { SelectedNumbersComponent } from "../../components/selected-numbers/selected-numbers.component";
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
    selector: "app-index",
    imports: [
        CommonModule,
        LotteryHeaderComponent,
        GameSelectorComponent,
        PrizeInfoComponent,
        NumberGridComponent,
        SelectedNumbersComponent,
        ActionButtonsComponent,
        SidebarComponent,
    ],
    template: `
    <div class="min-h-screen bg-background flex">
      <!-- Sidebar -->
      <app-sidebar [selectedGame]="selectedGame$ | async"></app-sidebar>

      <!-- Main Content -->
      <div class="flex-1 relative">
        <!-- Background decoration -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
          <div
            class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 py-6 max-w-4xl">
          <app-lottery-header></app-lottery-header>

          <div class="space-y-6">
            <!-- Game Selector -->
            <app-game-selector
              [selectedGame]="selectedGame$ | async"
              (gameChangeEvent)="onGameChange($event)"
            ></app-game-selector>

            <!-- Prize Info -->
            <app-prize-info [gameType]="selectedGame$ | async"></app-prize-info>

            <!-- Number Grid -->
            <app-number-grid
              [gameType]="selectedGame$ | async"
              [selectedNumbers]="selectedNumbers$ | async"
              (numberClickEvent)="onNumberClick($event)"
            ></app-number-grid>

            <!-- Selected Numbers -->
            <app-selected-numbers
              [gameType]="selectedGame$ | async"
              [selectedNumbers]="selectedNumbers$ | async"
              (removeNumberEvent)="onRemoveNumber($event)"
            ></app-selected-numbers>

            <!-- Action Buttons -->
            <app-action-buttons
              [gameType]="selectedGame$ | async"
              [selectedNumbers]="selectedNumbers$ | async"
              (surpriseEvent)="onSurprise()"
              (clearEvent)="onClear()"
            ></app-action-buttons>
          </div>

          <!-- Footer -->
          <footer class="mt-12 text-center text-muted-foreground text-sm">
            <p>© 2026 Loterias - Boa sorte! 🍀</p>
          </footer>
        </div>
      </div>
    </div>
  `
})
export class IndexComponent implements OnInit {
  private gameService = inject(GameService);

  selectedGame$;
  selectedNumbers$;

  constructor() {
    this.selectedGame$ = this.gameService.selectedGame$;
    this.selectedNumbers$ = this.gameService.selectedNumbers$;
  }

  ngOnInit(): void {}

  onGameChange(game: GameType): void {
    this.gameService.setSelectedGame(game);
  }

  onNumberClick(number: number): void {
    this.gameService.toggleNumber(number);
  }

  onRemoveNumber(number: number): void {
    this.gameService.removeNumber(number);
  }

  onSurprise(): void {
    this.gameService.generateSurprise();
  }

  onClear(): void {
    this.gameService.clearNumbers();
  }
}
