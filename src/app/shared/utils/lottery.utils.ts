import { GameType } from "../types/game-type.type";
import { LotteryGameCode } from "../enums/lottery-game-code.enum";
import { LotteryDefinitionListItem } from "../interfaces/lottery-definition-list-item.interface";
import {
  GAME_TYPE_TO_CODE,
  CODE_TO_GAME_TYPE,
} from "../constants/lottery.constants";

export function getGameCodeFromType(gameType: GameType): LotteryGameCode {
  return GAME_TYPE_TO_CODE[gameType];
}

export function getGameTypeFromCode(gameCode: LotteryGameCode): GameType {
  return CODE_TO_GAME_TYPE[gameCode];
}

export function getLotteryDefinitionById(
  id: string,
  definitions: LotteryDefinitionListItem[]
): LotteryDefinitionListItem | undefined {
  return definitions.find((def) => def.id === id);
}

export function getLotteryDefinitionByCode(
  gameCode: LotteryGameCode,
  definitions: LotteryDefinitionListItem[]
): LotteryDefinitionListItem | undefined {
  return definitions.find((def) => def.gameCode === gameCode);
}

export function getLotteryDefinitionByGameType(
  gameType: GameType,
  definitions: LotteryDefinitionListItem[]
): LotteryDefinitionListItem | undefined {
  const gameCode = getGameCodeFromType(gameType);
  return getLotteryDefinitionByCode(gameCode, definitions);
}
