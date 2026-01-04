import { LotteryGameCode } from "../enums/lottery-game-code.enum";

export interface LotteryDefinitionListItem {
  id: string;
  name: string;
  description: string;
  gameCode: LotteryGameCode;
  minPicks: number;
  maxPicks: number;
  numberPoolMaxNumbers: number;
  icon: string;
}
