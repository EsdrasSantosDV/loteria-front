import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameType, GAME_CONFIGS } from '../../services/game.service';

@Component({
    selector: 'app-action-buttons',
    imports: [CommonModule],
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
        [disabled]="(selectedNumbers?.length || 0) === 0"
        class="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-muted rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>🗑️</span>
        Limpar
      </button>
      
      <button
        (click)="handleBet()"
        [disabled]="!isComplete"
        [class]="isComplete ? 'btn-gold flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105' : 'bg-muted text-muted-foreground cursor-not-allowed px-6 py-3 rounded-xl font-bold'"
      >
        <span>🛒</span>
        Apostar
      </button>
    </div>
  `
})
export class ActionButtonsComponent {
  @Input() gameType: GameType | null = null;
  @Input() selectedNumbers: number[] | null = null;
  @Output() surpriseEvent = new EventEmitter<void>();
  @Output() clearEvent = new EventEmitter<void>();

  get config() {
    return this.gameType ? GAME_CONFIGS[this.gameType] : null;
  }

  get isComplete(): boolean {
    return (this.selectedNumbers?.length || 0) === (this.config?.maxNumbers || 0);
  }

  handleBet(): void {
    if (this.isComplete && this.selectedNumbers && this.config) {
      const sortedNumbers = [...this.selectedNumbers].sort((a, b) => a - b);
      const numbersStr = sortedNumbers.map(n => n.toString().padStart(2, '0')).join(' - ');
      alert(`Aposta registrada! ${this.config.name}: ${numbersStr}`);
    }
  }
}

