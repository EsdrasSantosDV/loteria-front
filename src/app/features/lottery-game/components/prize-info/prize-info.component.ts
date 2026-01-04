import { Component, computed, input } from "@angular/core";

import { GameType } from "../../services/game.service";

const PRIZE_DATA: Record<
  GameType,
  { accumulated: string; nextDraw: string; prize: string }
> = {
  "mega-sena": {
    accumulated: "R$ 45.000.000",
    nextDraw: "Quarta, 05/01",
    prize: "R$ 4,50",
  },
  quina: {
    accumulated: "R$ 8.500.000",
    nextDraw: "Segunda, 03/01",
    prize: "R$ 2,00",
  },
  lotofacil: {
    accumulated: "R$ 1.800.000",
    nextDraw: "Terça, 04/01",
    prize: "R$ 2,50",
  },
  lotomania: {
    accumulated: "R$ 12.000.000",
    nextDraw: "Sábado, 07/01",
    prize: "R$ 3,00",
  },
};

@Component({
  selector: "app-prize-info",
  imports: [],
  template: `
    <div class="glass-card py-4 px-6">
      @let data = dataComputed();
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="text-center">
          <div
            class="flex items-center justify-center gap-2 text-muted-foreground mb-1"
          >
            <span>📈</span>
            <span class="text-sm">Acumulado</span>
          </div>
          <p class="text-xl sm:text-2xl font-bold text-gradient">
            {{ data?.accumulated }}
          </p>
        </div>

        <div class="text-center">
          <div
            class="flex items-center justify-center gap-2 text-muted-foreground mb-1"
          >
            <span>📅</span>
            <span class="text-sm">Próximo Sorteio</span>
          </div>
          <p class="text-lg font-semibold text-foreground">
            {{ data?.nextDraw }}
          </p>
        </div>

        <div class="text-center">
          <div
            class="flex items-center justify-center gap-2 text-muted-foreground mb-1"
          >
            <span>💰</span>
            <span class="text-sm">Valor da Aposta</span>
          </div>
          <p class="text-lg font-semibold text-foreground">{{ data?.prize }}</p>
        </div>
      </div>
    </div>
  `,
})
export class PrizeInfoComponent {
  readonly gameType = input<GameType | null>(null);

  dataComputed = computed(() => {
    const gameType = this.gameType();
    return gameType ? PRIZE_DATA[gameType] : null;
  });
}
