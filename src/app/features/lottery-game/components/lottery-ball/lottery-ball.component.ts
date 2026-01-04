import { Component, input, output } from "@angular/core";

import { cn } from "../../../../shared/utils/cn";

@Component({
  selector: "app-lottery-ball",
  imports: [],
  template: `
    <button
      (click)="onClick.emit()"
      [disabled]="disabled()"
      [class]="
        cn(
          'lottery-ball',
          selected() && 'selected ' + gameType(),
          disabled() &&
            !selected() &&
            'opacity-50 cursor-not-allowed hover:scale-100'
        )
      "
    >
      {{ number().toString().padStart(2, "0") }}
    </button>
  `,
})
export class LotteryBallComponent {
  readonly number = input.required<number>();
  readonly selected = input(false);
  readonly gameType = input<"mega-sena" | "quina" | "lotofacil">("mega-sena");
  readonly disabled = input(false);
  readonly onClick = output<void>();

  cn = cn;
}
