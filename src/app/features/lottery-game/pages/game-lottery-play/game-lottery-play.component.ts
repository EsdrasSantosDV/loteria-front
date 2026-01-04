import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GameService,
  GameType,
} from "../../../../core/singletons/services/game.service";
import { LotteryHeaderComponent } from "../../components/lottery-header/lottery-header.component";
import { GameSelectorComponent } from "../../components/game-selector/game-selector.component";
import { PrizeInfoComponent } from "../../components/prize-info/prize-info.component";
import { NumberGridComponent } from "../../components/number-grid/number-grid.component";
import { SelectedNumbersComponent } from "../../components/selected-numbers/selected-numbers.component";

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
          [selectedGame]="gameService.selectedGame$ | async"
          (gameChangeEvent)="gameService.setSelectedGame($event)"
        ></app-game-selector>
      </div>
      <div class="space-y-4 sm:space-y-6">
        <!-- Game Selector -->

        <!-- Prize Info -->
        <app-prize-info
          [gameType]="gameService.selectedGame$ | async"
        ></app-prize-info>

        <!-- Number Grid -->
        <app-number-grid
          [gameType]="gameService.selectedGame$ | async"
          [selectedNumbers]="gameService.selectedNumbers$ | async"
          (numberClickEvent)="gameService.toggleNumber($event)"
        ></app-number-grid>

        <!-- Selected Numbers -->
        <app-selected-numbers
          [gameType]="gameService.selectedGame$ | async"
          [selectedNumbers]="gameService.selectedNumbers$ | async"
          (removeNumberEvent)="gameService.removeNumber($event)"
          (surpriseEvent)="gameService.generateSurprise()"
          (clearEvent)="gameService.clearNumbers()"
        ></app-selected-numbers>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLotteryPlayComponent {
  gameService = inject(GameService);
}
