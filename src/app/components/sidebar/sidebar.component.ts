import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameType } from '../../services/game.service';
import { cn } from '../../utils/cn';

const menuItems = [
  { icon: '🏠', label: 'Início', active: true },
  { icon: '🎫', label: 'Minhas Apostas' },
  { icon: '📜', label: 'Resultados' },
  { icon: '🔔', label: 'Notificações' },
  { icon: '👤', label: 'Minha Conta' },
  { icon: '❓', label: 'Ajuda' },
];

const gameIcons: Record<GameType, string> = {
  'mega-sena': '🍀',
  'quina': '⭐',
  'lotofacil': '✨',
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="hidden lg:flex flex-col w-64 min-h-screen bg-card/50 backdrop-blur-xl border-r border-border/50">
      <!-- Logo -->
      <div class="p-6 border-b border-border/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span class="text-background text-xl">🎫</span>
          </div>
          <div>
            <h2 class="font-bold text-lg">Loterias</h2>
            <p class="text-xs text-muted-foreground">Sua sorte começa aqui</p>
          </div>
        </div>
      </div>

      <!-- Current Game -->
      <div class="p-4 mx-4 mt-4 rounded-xl bg-secondary/50 border border-border/50">
        <p class="text-xs text-muted-foreground mb-2">Jogando agora</p>
        <div class="flex items-center gap-2">
          <span [class]="cn(
            'text-xl',
            selectedGame === 'mega-sena' && 'text-primary',
            selectedGame === 'quina' && 'text-purple-400',
            selectedGame === 'lotofacil' && 'text-pink-400'
          )">{{ getGameIcon() }}</span>
          <span class="font-semibold capitalize">{{ getGameName() }}</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4">
        <ul class="space-y-1">
          @for (item of menuItems; track item.label) {
            <li>
              <button
                [class]="cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  item.active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )"
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
        <div class="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
          <p class="text-sm font-semibold mb-1">🎉 Promoção</p>
          <p class="text-xs text-muted-foreground">
            Aposte 3 jogos e ganhe 1 grátis!
          </p>
        </div>
      </div>

      <!-- User -->
      <div class="p-4 border-t border-border/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span class="text-muted-foreground text-xl">👤</span>
          </div>
          <div>
            <p class="font-medium text-sm">Visitante</p>
            <p class="text-xs text-muted-foreground">Fazer login</p>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  @Input() selectedGame: GameType | null = null;

  menuItems = menuItems;
  cn = cn;

  getGameIcon(): string {
    return this.selectedGame ? gameIcons[this.selectedGame] : '🎲';
  }

  getGameName(): string {
    return this.selectedGame ? this.selectedGame.replace('-', ' ') : '';
  }
}

