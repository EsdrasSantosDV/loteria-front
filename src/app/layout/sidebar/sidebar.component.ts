import { Component, computed, input, signal } from "@angular/core";

import { GameType } from "../../features/lottery-game/services/game.service";
import { cn } from "../../shared/utils/cn";
import { UserProfileComponent } from "./user-profile/user-profile.component";

@Component({
  selector: "app-sidebar",
  imports: [UserProfileComponent],
  template: `
    <aside
      class="hidden lg:flex flex-col w-64 fixed top-0 left-0 h-screen bg-card/50 backdrop-blur-xl border-r border-border/50 z-20"
    >
      <!-- Logo -->
      <div class="p-6 border-b border-border/50">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
          >
            <span class="text-background text-xl">🎫</span>
          </div>
          <div>
            <h2 class="font-bold text-lg">Loterias</h2>
            <p class="text-xs text-muted-foreground">Sua sorte começa aqui</p>
          </div>
        </div>
      </div>

      <div
        class="p-4 mx-4 mt-4 rounded-xl bg-secondary/50 border border-border/50"
      >
        <p class="text-xs text-muted-foreground mb-2">Jogando agora</p>
        <div class="flex items-center gap-2">
          <span
            [class]="
              cn(
                'text-xl',
                selectedGame() === 'mega-sena' && 'text-primary',
                selectedGame() === 'quina' && 'text-purple-400',
                selectedGame() === 'lotofacil' && 'text-pink-400',
                selectedGame() === 'lotomania' && 'text-cyan-400'
              )
            "
            >{{ getGameIcon() }}</span
          >
          <span class="font-semibold capitalize">{{ getGameName() }}</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4">
        <ul class="space-y-1">
          @for (item of menuItems(); track item.label) {
          <li>
            <button
              [class]="
                cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  item.active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )
              "
            >
              <span class="text-xl">{{ item.icon }}</span>
              <span class="font-medium">{{ item.label }}</span>
            </button>
          </li>
          }
        </ul>
      </nav>

      <!-- Promo Card -->
      <div class="p-4">
        <div
          class="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30"
        >
          <p class="text-sm font-semibold mb-1">🎉 Promoção</p>
          <p class="text-xs text-muted-foreground">
            Aposte 3 jogos e ganhe 1 grátis!
          </p>
        </div>
      </div>

      <!-- User -->
      <app-user-profile />
    </aside>
  `,
})
export class SidebarComponent {
  readonly selectedGame = input<GameType | null>(null);

  menuItems = signal([
    { icon: "🏠", label: "Início", active: true },
    { icon: "🎫", label: "Minhas Apostas" },
    { icon: "📜", label: "Resultados" },
    { icon: "🔔", label: "Notificações" },
    { icon: "👤", label: "Minha Conta" },
    { icon: "❓", label: "Ajuda" },
  ]);

  gameIcons = signal<Record<GameType, string>>({
    "mega-sena": "🍀",
    quina: "⭐",
    lotofacil: "✨",
    lotomania: "💎",
  });
  cn = cn;

  getGameIcon = computed(() => {
    const selectedGame = this.selectedGame();
    return selectedGame ? this.gameIcons()[selectedGame] : "🎲";
  });

  getGameName = computed(() => {
    const selectedGame = this.selectedGame();
    return selectedGame ? selectedGame.replace("-", " ") : "";
  });
}
