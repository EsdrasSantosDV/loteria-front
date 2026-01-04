import { Component } from "@angular/core";

import { RouterModule } from "@angular/router";

@Component({
    selector: "app-not-found",
    imports: [RouterModule],
    template: `
    <div class="flex min-h-screen items-center justify-center bg-muted">
      <div class="text-center">
        <h1 class="mb-4 text-4xl font-bold">404</h1>
        <p class="mb-4 text-xl text-muted-foreground">
          Oops! Página não encontrada
        </p>
        <a routerLink="/" class="text-primary underline hover:text-primary/90">
          Voltar para Home
        </a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
