import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import {
  GameService,
  GameType,
} from '../../core/singletons/services/game.service';
import { LotteryHeaderComponent } from '../../features/lottery-game/components/lottery-header/lottery-header.component';
import { GameSelectorComponent } from '../../features/lottery-game/components/game-selector/game-selector.component';
import { PrizeInfoComponent } from '../../features/lottery-game/components/prize-info/prize-info.component';
import { NumberGridComponent } from '../../features/lottery-game/components/number-grid/number-grid.component';
import { SelectedNumbersComponent } from '../../features/lottery-game/components/selected-numbers/selected-numbers.component';
import { ActionButtonsComponent } from '../../features/lottery-game/components/action-buttons/action-buttons.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    SidebarComponent,
    FooterComponent,
    LotteryHeaderComponent,
    GameSelectorComponent,
    PrizeInfoComponent,
    NumberGridComponent,
    SelectedNumbersComponent,
    ActionButtonsComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  private gameService = inject(GameService);

  selectedGame$;
  selectedNumbers$;

  constructor() {
    this.selectedGame$ = this.gameService.selectedGame$;
    this.selectedNumbers$ = this.gameService.selectedNumbers$;
  }

  ngOnInit(): void {}

  onGameChange(game: GameType): void {
    this.gameService.setSelectedGame(game);
  }

  onNumberClick(number: number): void {
    this.gameService.toggleNumber(number);
  }

  onRemoveNumber(number: number): void {
    this.gameService.removeNumber(number);
  }

  onSurprise(): void {
    this.gameService.generateSurprise();
  }

  onClear(): void {
    this.gameService.clearNumbers();
  }
}
