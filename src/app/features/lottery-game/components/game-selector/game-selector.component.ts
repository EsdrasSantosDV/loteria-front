import { Component, input, output } from "@angular/core";

import { GameType } from "../../services/game.service";
import { cn } from "../../../../shared/utils/cn";
import { GameIconPipe } from "../../../../shared/pipes/game-icon.pipe";
import { GameTypePipe } from "../../../../shared/pipes/game-type.pipe";
import { LotteryDefinitionListItem } from "../../../../shared/interfaces/lottery-definition-list-item.interface";
import { getGameTypeFromCode } from "../../../../shared/utils/lottery.utils";

@Component({
  selector: "app-game-selector",
  imports: [GameIconPipe, GameTypePipe],
  template: `
    <div class="flex flex-wrap justify-center gap-3">
      @for (game of games(); track game.id) {
      <button
        (click)="onGameClick(game)"
        [class]="
          cn(
            'game-tab flex items-center gap-2',
            selectedGame() === (game | gameType) &&
              'active ' + (game | gameType)
          )
        "
      >
        <span>{{ game.icon | gameIcon }}</span>
        <span>{{ game.name }}</span>
      </button>
      }
    </div>
  `,
})
export class GameSelectorComponent {
  readonly selectedGame = input<GameType | null>(null);
  readonly gameChangeEvent = output<GameType>();
  readonly games = input<LotteryDefinitionListItem[]>([]);

  cn = cn;

  onGameClick(game: LotteryDefinitionListItem): void {
    const gameType = getGameTypeFromCode(game.gameCode);
    this.gameChangeEvent.emit(gameType);
  }
}
