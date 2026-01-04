import { GameType } from "../types/game-type.type";

export interface GameConfig {
  id: GameType;
  name: string;
  icon: string;
  maxNumbers: number;
  totalNumbers: number;
  description: string;
}


