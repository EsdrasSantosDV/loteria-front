import { Routes } from "@angular/router";
import { GameLotteryPlayComponent } from "./pages/game-lottery-play/game-lottery-play.component";

export const lotteryGamesRoutes: Routes = [
  { path: "lottery-game", component: GameLotteryPlayComponent },
];
