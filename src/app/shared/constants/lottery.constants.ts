import { GameType } from "../types/game-type.type";
import { LotteryGameCode } from "../enums/lottery-game-code.enum";

export const GAME_TYPE_TO_CODE: Record<GameType, LotteryGameCode> = {
  "mega-sena": LotteryGameCode.MEGA_SENA,
  quina: LotteryGameCode.QUINA,
  lotofacil: LotteryGameCode.LOTOFACIL,
  lotomania: LotteryGameCode.LOTOMANIA,
};

export const CODE_TO_GAME_TYPE: Record<LotteryGameCode, GameType> = {
  [LotteryGameCode.MEGA_SENA]: "mega-sena",
  [LotteryGameCode.QUINA]: "quina",
  [LotteryGameCode.LOTOFACIL]: "lotofacil",
  [LotteryGameCode.LOTOMANIA]: "lotomania",
};
