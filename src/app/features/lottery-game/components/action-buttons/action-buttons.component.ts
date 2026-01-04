import { Component, computed, input, output } from "@angular/core";

import { GameType } from "../../services/game.service";
import { LotteryDefinitionListItem } from "../../../../shared/interfaces/lottery-definition-list-item.interface";
import { getLotteryDefinitionByGameType } from "../../../../shared/utils/lottery.utils";

@Component({
  selector: "app-action-buttons",
  imports: [],
  template: `
    <div class="flex flex-wrap justify-center gap-4">
      <button
        (click)="surpriseEvent.emit()"
        class="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-muted rounded-xl font-semibold transition-all duration-300 hover:scale-105"
      >
        <span>🔀</span>
        Surpresinha
      </button>

      <button
        (click)="clearEvent.emit()"
        [disabled]="(selectedNumbers()?.length || 0) === 0"
        class="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-muted rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>🗑️</span>
        Limpar
      </button>

      <button
        (click)="handleBet()"
        [disabled]="!isComplete()"
        [class]="
          isComplete()
            ? 'btn-gold flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105'
            : 'bg-muted text-muted-foreground cursor-not-allowed px-6 py-3 rounded-xl font-bold'
        "
      >
        <span>🛒</span>
        Apostar
      </button>
    </div>
  `,
})
export class ActionButtonsComponent {
  readonly gameType = input<GameType | null>(null);
  readonly selectedNumbers = input<number[] | null>(null);
  readonly surpriseEvent = output<void>();
  readonly clearEvent = output<void>();
  readonly definitions = input<LotteryDefinitionListItem[]>([]);

  config = computed(() => {
    const gameType = this.gameType();
    if (!gameType) return undefined;
    return getLotteryDefinitionByGameType(gameType, this.definitions());
  });

  isComplete = computed(() => {
    return (
      (this.selectedNumbers()?.length || 0) >= (this.config()?.minPicks || 0)
    );
  });

  handleBet(): void {
    const selectedNumbers = this.selectedNumbers();
    const config = this.config();
    if (this.isComplete() && selectedNumbers && config) {
      const sortedNumbers = [...selectedNumbers].sort((a, b) => a - b);
      const numbersStr = sortedNumbers
        .map((n) => n.toString().padStart(2, "0"))
        .join(" - ");
      alert(`Aposta registrada! ${config.name}: ${numbersStr}`);
    }
  }
}
