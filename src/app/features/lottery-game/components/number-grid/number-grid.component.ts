import { Component, computed, input, output } from "@angular/core";

import { GameType } from "../../services/game.service";
import { LotteryBallComponent } from "../lottery-ball/lottery-ball.component";
import { LotteryDefinitionListItem } from "../../../../shared/interfaces/lottery-definition-list-item.interface";
import { getLotteryDefinitionByGameType } from "../../../../shared/utils/lottery.utils";

@Component({
  selector: "app-number-grid",
  imports: [LotteryBallComponent],
  template: `
    <div class="glass-card py-4 px-6">
      <div class="text-center mb-4">
        <p class="text-muted-foreground text-sm">{{ config()?.description }}</p>
        <p class="text-foreground font-semibold mt-1">
          Selecionados: {{ selectedNumbers()?.length || 0 }} /
          {{ config()?.maxPicks }}
        </p>
      </div>

      <div
        class="grid gap-3 sm:gap-2 justify-center"
        [style.grid-template-columns]="
          'repeat(' +
          (gameType() === 'lotofacil'
            ? 5
            : gameType() === 'lotomania'
            ? 10
            : 10) +
          ', minmax(0, 1fr))'
        "
      >
        @for (number of numbers(); track number) {
        <app-lottery-ball
          [number]="number"
          [selected]="selectedNumbers()?.includes(number) || false"
          (onClick)="numberClickEvent.emit(number)"
          [gameType]="gameType() || 'mega-sena'"
          [disabled]="isMaxSelected() && !selectedNumbers()?.includes(number)"
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
  readonly definitions = input<LotteryDefinitionListItem[]>([]);

  config = computed(() => {
    const gameType = this.gameType();
    if (!gameType) return undefined;
    return getLotteryDefinitionByGameType(gameType, this.definitions());
  });

  numbers = computed(() => {
    const config = this.config();
    const gameType = this.gameType();
    if (!config) return [];

    if (gameType === "lotomania") {
      return Array.from(
        { length: config.numberPoolMaxNumbers + 1 },
        (_, i) => i
      );
    }

    return Array.from({ length: config.numberPoolMaxNumbers }, (_, i) => i + 1);
  });

  isMaxSelected = computed(() => {
    return (
      (this.selectedNumbers()?.length || 0) >= (this.config()?.maxPicks || 0)
    );
  });
}
