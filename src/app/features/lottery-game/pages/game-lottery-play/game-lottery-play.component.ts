import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameService, GameType } from "../../services/game.service";
import { LotteryHeaderComponent } from "../../components/lottery-header/lottery-header.component";
import { GameSelectorComponent } from "../../components/game-selector/game-selector.component";
import { PrizeInfoComponent } from "../../components/prize-info/prize-info.component";
import { NumberGridComponent } from "../../components/number-grid/number-grid.component";
import { SelectedNumbersComponent } from "../../components/selected-numbers/selected-numbers.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-game-lottery-play",
  imports: [
    CommonModule,
    LotteryHeaderComponent,
    GameSelectorComponent,
    PrizeInfoComponent,
    NumberGridComponent,
    SelectedNumbersComponent,
  ],
  template: `
    <div class="flex flex-col gap-4 sm:gap-6">
      <app-lottery-header></app-lottery-header>
      <div class="-mt-2 sm:-mt-3">
        <app-game-selector
          [selectedGame]="selectedGame()"
          [games]="definitions()"
          (gameChangeEvent)="gameService.setSelectedGame($event)"
        ></app-game-selector>
      </div>
      <div class="space-y-4 sm:space-y-6">
        <!-- Game Selector -->

        <!-- Prize Info -->
        <app-prize-info [gameType]="selectedGame()"></app-prize-info>

        <!-- Number Grid -->
        <app-number-grid
          [gameType]="selectedGame()"
          [selectedNumbers]="selectedNumbers()"
          [definitions]="definitions()"
          (numberClickEvent)="onNumberClick($event)"
        ></app-number-grid>

        <!-- Selected Numbers -->
        <app-selected-numbers
          [gameType]="selectedGame()"
          [selectedNumbers]="selectedNumbers()"
          [definitions]="definitions()"
          (removeNumberEvent)="gameService.removeNumber($event)"
          (surpriseEvent)="onSurprise()"
          (clearEvent)="gameService.clearNumbers()"
        ></app-selected-numbers>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLotteryPlayComponent {
  gameService = inject(GameService);

  definitions = this.gameService.lotteryDefinitionsList;
  selectedGame = toSignal(this.gameService.selectedGame$, {
    initialValue: "mega-sena" as GameType,
  });
  selectedNumbers = toSignal(this.gameService.selectedNumbers$, {
    initialValue: [] as number[],
  });

  onNumberClick(number: number): void {
    const defs = this.definitions();
    if (defs.length > 0) {
      this.gameService.toggleNumber(number, defs);
    }
  }

  onSurprise(): void {
    const defs = this.definitions();
    if (defs.length > 0) {
      this.gameService.generateSurprise(defs);
    }
  }
}
