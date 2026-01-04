import { Component, input, output } from "@angular/core";

import {
  GameType,
  GAME_CONFIGS,
} from "../../../../core/singletons/services/game.service";
import { LotteryBallComponent } from "../lottery-ball/lottery-ball.component";

@Component({
  selector: "app-number-grid",
  imports: [LotteryBallComponent],
  template: `
    <div class="glass-card p-6">
      <div class="text-center mb-6">
        <p class="text-muted-foreground text-sm">{{ config?.description }}</p>
        <p class="text-foreground font-semibold mt-1">
          Selecionados: {{ selectedNumbers()?.length || 0 }} /
          {{ config?.maxNumbers }}
        </p>
      </div>

      <div
        class="grid gap-2 justify-center"
        [style.grid-template-columns]="
          'repeat(' +
          (gameType() === 'lotofacil' ? 5 : 10) +
          ', minmax(0, 1fr))'
        "
      >
        @for (number of numbers; track number) {
        <app-lottery-ball
          [number]="number"
          [selected]="selectedNumbers()?.includes(number) || false"
          (onClick)="numberClickEvent.emit(number)"
          [gameType]="gameType() || 'mega-sena'"
          [disabled]="isMaxSelected && !selectedNumbers()?.includes(number)"
        ></app-lottery-ball>
        }
      </div>
    </div>
  `,
})
export class NumberGridComponent {
  readonly gameType = input<GameType | null>(null);
  readonly selectedNumbers = input<number[] | null>(null);
  readonly numberClickEvent = output<number>();

  get config() {
    const gameType = this.gameType();
    return gameType ? GAME_CONFIGS[gameType] : null;
  }

  get numbers(): number[] {
    if (this.config) {
      return Array.from({ length: this.config.totalNumbers }, (_, i) => i + 1);
    }
    return [];
  }

  get isMaxSelected(): boolean {
    return (
      (this.selectedNumbers()?.length || 0) >= (this.config?.maxNumbers || 0)
    );
  }
}
