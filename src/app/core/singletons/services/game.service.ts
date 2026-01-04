import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type GameType = 'mega-sena' | 'quina' | 'lotofacil';

export interface GameConfig {
  id: GameType;
  name: string;
  icon: string;
  maxNumbers: number;
  totalNumbers: number;
  description: string;
}

export const GAME_CONFIGS: Record<GameType, GameConfig> = {
  'mega-sena': {
    id: 'mega-sena',
    name: 'Mega Sena',
    icon: 'clover',
    maxNumbers: 6,
    totalNumbers: 60,
    description: 'Escolha 6 números de 1 a 60',
  },
  'quina': {
    id: 'quina',
    name: 'Quina',
    icon: 'star',
    maxNumbers: 5,
    totalNumbers: 80,
    description: 'Escolha 5 números de 1 a 80',
  },
  'lotofacil': {
    id: 'lotofacil',
    name: 'Lotofácil',
    icon: 'sparkles',
    maxNumbers: 15,
    totalNumbers: 25,
    description: 'Escolha 15 números de 1 a 25',
  },
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private selectedGameSubject = new BehaviorSubject<GameType>('mega-sena');
  private selectedNumbersSubject = new BehaviorSubject<number[]>([]);

  selectedGame$: Observable<GameType> = this.selectedGameSubject.asObservable();
  selectedNumbers$: Observable<number[]> = this.selectedNumbersSubject.asObservable();

  get selectedGame(): GameType {
    return this.selectedGameSubject.value;
  }

  get selectedNumbers(): number[] {
    return this.selectedNumbersSubject.value;
  }

  setSelectedGame(game: GameType): void {
    this.selectedGameSubject.next(game);
    this.selectedNumbersSubject.next([]);
  }

  toggleNumber(number: number): void {
    const current = this.selectedNumbers;
    const config = GAME_CONFIGS[this.selectedGame];
    
    if (current.includes(number)) {
      this.selectedNumbersSubject.next(current.filter(n => n !== number));
    } else if (current.length < config.maxNumbers) {
      this.selectedNumbersSubject.next([...current, number]);
    }
  }

  removeNumber(number: number): void {
    this.selectedNumbersSubject.next(
      this.selectedNumbers.filter(n => n !== number)
    );
  }

  generateSurprise(): void {
    const config = GAME_CONFIGS[this.selectedGame];
    const allNumbers = Array.from({ length: config.totalNumbers }, (_, i) => i + 1);
    const shuffled = allNumbers.sort(() => Math.random() - 0.5);
    this.selectedNumbersSubject.next(shuffled.slice(0, config.maxNumbers));
  }

  clearNumbers(): void {
    this.selectedNumbersSubject.next([]);
  }
}

