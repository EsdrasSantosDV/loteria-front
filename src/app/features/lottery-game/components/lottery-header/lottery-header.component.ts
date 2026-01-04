import { Component } from '@angular/core';


@Component({
    selector: 'app-lottery-header',
    imports: [],
    template: `
    <header class="text-center pt-4 pb-4">
      <div class="flex items-center justify-center gap-3 mb-4">
        <span class="w-10 h-10 text-primary animate-float text-2xl">🎫</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold">
          <span class="text-gradient">Loterias</span>
        </h1>
        <span class="w-10 h-10 text-accent animate-float text-2xl" style="animation-delay: 0.5s">🏆</span>
      </div>
      <p class="text-muted-foreground text-lg">
        Escolha seus números da sorte e realize seus sonhos! 🍀
      </p>
    </header>
  `
})
export class LotteryHeaderComponent {}

