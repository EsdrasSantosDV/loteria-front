import { Pipe, PipeTransform } from "@angular/core";
import { LotteryDefinitionListItem } from "../interfaces/lottery-definition-list-item.interface";
import { GameType } from "../types/game-type.type";
import { getGameTypeFromCode } from "../utils/lottery.utils";

@Pipe({
  name: "gameType",
  standalone: true,
  pure: true,
})
export class GameTypePipe implements PipeTransform {
  transform(game: LotteryDefinitionListItem): GameType {
    return getGameTypeFromCode(game.gameCode);
  }
}
