import { Component, input, output } from "@angular/core";

import {
  GameType,
  GAME_CONFIGS,
} from "../../../../core/singletons/services/game.service";
import { cn } from "../../../../shared/utils/cn";

@Component({
  selector: "app-game-selector",
  imports: [],
  template: `
    <div class="flex flex-wrap justify-center gap-3">
      @for (game of games; track game.id) {
      <button
        (click)="gameChangeEvent.emit(game.id)"
        [class]="
          cn(
            'game-tab flex items-center gap-2',
            selectedGame() === game.id && 'active ' + game.id
          )
        "
      >
        <span [innerHTML]="getIcon(game.icon)"></span>
        <span>{{ game.name }}</span>
      </button>
      }
    </div>
  `,
})
export class GameSelectorComponent {
  readonly selectedGame = input<GameType | null>(null);
  readonly gameChangeEvent = output<GameType>();

  games = Object.values(GAME_CONFIGS);
  cn = cn;

  getIcon(iconName: string): string {
    const icons: Record<string, string> = {
      clover: "🍀",
      star: "⭐",
      sparkles: "✨",
    };
    return icons[iconName] || "🎲";
  }
}
