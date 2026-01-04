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
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";

@Component({
  selector: "app-game-lottery-play",
  imports: [
    CommonModule,
    LotteryHeaderComponent,
    GameSelectorComponent,
    PrizeInfoComponent,
    NumberGridComponent,
    SelectedNumbersComponent,
    ActionButtonsComponent,
  ],
  template: `
    <div class="flex flex-col gap-8">
      <app-lottery-header></app-lottery-header>

      <div class="space-y-8">
        <!-- Game Selector -->
        <app-game-selector
          [selectedGame]="gameService.selectedGame$ | async"
          (gameChangeEvent)="gameService.setSelectedGame($event)"
        ></app-game-selector>

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
        ></app-selected-numbers>

        <!-- Action Buttons -->
        <app-action-buttons
          [gameType]="gameService.selectedGame$ | async"
          [selectedNumbers]="gameService.selectedNumbers$ | async"
          (surpriseEvent)="gameService.generateSurprise()"
          (clearEvent)="gameService.clearNumbers()"
        ></app-action-buttons>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameLotteryPlayComponent {
  gameService = inject(GameService);
}
