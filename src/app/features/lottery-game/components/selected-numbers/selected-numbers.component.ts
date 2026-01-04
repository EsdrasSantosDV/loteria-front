import { Component, computed, input, output } from "@angular/core";

import {
  GameType,
  GAME_CONFIGS,
} from "../../../../core/singletons/services/game.service";
import { cn } from "../../../../shared/utils/cn";
import { PadNumberPipe } from "../../../../shared/pipes/pad-number.pipe";

@Component({
  selector: "app-selected-numbers",
  imports: [PadNumberPipe],
  template: `
    <div class="glass-card p-6">
      <h3 class="text-lg font-semibold text-center mb-4">Seus Números</h3>

      <div class="flex flex-wrap justify-center gap-2">
        @for (number of sortedNumbers(); track number) {
        <div
          [class]="
            cn('selected-number relative group', gameType() || 'mega-sena')
          "
        >
          {{ number | padNumber }}
          <button
            (click)="removeNumberEvent.emit(number)"
            class="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span class="text-white text-xs">×</span>
          </button>
        </div>
        } @for (empty of emptySlots(); track $index) {
        <div
          class="w-10 h-10 rounded-full border-2 border-dashed border-muted flex items-center justify-center"
        >
          <span class="text-muted-foreground text-xs">?</span>
        </div>
        }
      </div>

      @if (selectedNumbers()?.length === config()?.maxNumbers) {
      <div class="mt-4 text-center">
        <p class="text-primary text-sm font-medium animate-pulse">
          ✓ Aposta completa!
        </p>
      </div>
      }
    </div>
  `,
})
export class SelectedNumbersComponent {
  readonly gameType = input<GameType | null>(null);
  readonly selectedNumbers = input<number[] | null>(null);
  readonly removeNumberEvent = output<number>();

  cn = cn;

  config = computed(() => {
    const gameType = this.gameType();
    return gameType ? GAME_CONFIGS[gameType] : null;
  });

  sortedNumbers = computed(() => {
    const selectedNumbers = this.selectedNumbers();
    return selectedNumbers ? [...selectedNumbers].sort((a, b) => a - b) : [];
  });

  emptySlots = computed(() => {
    const empty =
      (this.config()?.maxNumbers || 0) - (this.selectedNumbers()?.length || 0);
    return Array.from({ length: Math.max(0, empty) });
  });
}
