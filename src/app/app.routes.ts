import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { NotFoundComponent } from "./layout/not-found/not-found.component";
import { lotteryGamesRoutes } from "./features/lottery-game/lottery-games.routes";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/lottery-game",
    pathMatch: "full",
  },
  ...lotteryGamesRoutes,

  { path: "**", component: NotFoundComponent },
];
