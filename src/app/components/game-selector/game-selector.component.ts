import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameType, GAME_CONFIGS } from '../../services/game.service';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-game-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap justify-center gap-3">
      @for (game of games; track game.id) {
        <button
          (click)="gameChangeEvent.emit(game.id)"
          [class]="cn('game-tab flex items-center gap-2', selectedGame === game.id && 'active ' + game.id)"
        >
          <span [innerHTML]="getIcon(game.icon)"></span>
          <span>{{ game.name }}</span>
        </button>
      }
    </div>
  `
})
export class GameSelectorComponent {
  @Input() selectedGame: GameType | null = null;
  @Output() gameChangeEvent = new EventEmitter<GameType>();

  games = Object.values(GAME_CONFIGS);
  cn = cn;

  getIcon(iconName: string): string {
    const icons: Record<string, string> = {
      clover: '🍀',
      star: '⭐',
      sparkles: '✨'
    };
    return icons[iconName] || '🎲';
  }
}

