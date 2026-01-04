import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/cn';

@Component({
  selector: 'app-lottery-ball',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="onClick.emit()"
      [disabled]="disabled"
      [class]="cn(
        'lottery-ball',
        selected && 'selected ' + gameType,
        disabled && !selected && 'opacity-50 cursor-not-allowed hover:scale-100'
      )"
    >
      {{ number.toString().padStart(2, '0') }}
    </button>
  `
})
export class LotteryBallComponent {
  @Input() number!: number;
  @Input() selected = false;
  @Input() gameType: 'mega-sena' | 'quina' | 'lotofacil' = 'mega-sena';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();

  cn = cn;
}

