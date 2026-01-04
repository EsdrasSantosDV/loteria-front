import { inject, Injectable, computed } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GameType } from "../../../shared/types/game-type.type";
import { LotteryDefinitionsHttpService } from "@/app/core/singletons/http/lottery.definitions.http.service";
import { PageResult } from "@/app/shared/interfaces/page-result";
import { LotteryDefinitionListItem } from "@/app/shared/interfaces/lottery-definition-list-item.interface";
import { rxResource } from "@angular/core/rxjs-interop";
import { toObservable } from "@angular/core/rxjs-interop";
import { getLotteryDefinitionByGameType } from "../../../shared/utils/lottery.utils";
export type { GameType } from "../../../shared/types/game-type.type";
export { LotteryGameCode } from "../../../shared/enums/lottery-game-code.enum";
export type { LotteryDefinitionListItem } from "../../../shared/interfaces/lottery-definition-list-item.interface";
export {
  getGameCodeFromType,
  getGameTypeFromCode,
  getLotteryDefinitionById,
  getLotteryDefinitionByCode,
  getLotteryDefinitionByGameType,
} from "../../../shared/utils/lottery.utils";
@Injectable({
  providedIn: "root",
})
export class GameService {
  #lotteryDefinitionsHttpService = inject(LotteryDefinitionsHttpService);

  lotteryDefinitions$ = rxResource({
    stream: () =>
      this.#lotteryDefinitionsHttpService.getLotteryDefinitions({
        page: 0,
        pageSize: 10,
      }),
    defaultValue: {
      items: [],
      page: 1,
      pageSize: 10,
      total: 0,
      hasNext: false,
    } as PageResult<LotteryDefinitionListItem>,
  });

  lotteryDefinitionsList = computed(() => {
    return this.lotteryDefinitions$.value().items;
  });

  lotteryDefinitionsList$ = toObservable(this.lotteryDefinitionsList);

  private selectedGameSubject = new BehaviorSubject<GameType>("mega-sena");
  private selectedNumbersSubject = new BehaviorSubject<number[]>([]);

  selectedGame$: Observable<GameType> = this.selectedGameSubject.asObservable();
  selectedNumbers$: Observable<number[]> =
    this.selectedNumbersSubject.asObservable();

  getDefinitionByGameType(
    gameType: GameType,
    definitions: LotteryDefinitionListItem[]
  ): LotteryDefinitionListItem | undefined {
    return getLotteryDefinitionByGameType(gameType, definitions);
  }

  setSelectedGame(game: GameType): void {
    this.selectedGameSubject.next(game);
    this.selectedNumbersSubject.next([]);
  }

  toggleNumber(number: number, definitions: LotteryDefinitionListItem[]): void {
    const current = this.selectedNumbersSubject.value;
    const gameType = this.selectedGameSubject.value;
    const definition = this.getDefinitionByGameType(gameType, definitions);

    if (!definition) return;

    if (current.includes(number)) {
      this.selectedNumbersSubject.next(current.filter((n) => n !== number));
    } else if (current.length < definition.maxPicks) {
      this.selectedNumbersSubject.next([...current, number]);
    }
  }

  removeNumber(number: number): void {
    this.selectedNumbersSubject.next(
      this.selectedNumbersSubject.value.filter((n) => n !== number)
    );
  }

  generateSurprise(definitions: LotteryDefinitionListItem[]): void {
    const gameType = this.selectedGameSubject.value;
    const definition = this.getDefinitionByGameType(gameType, definitions);

    if (!definition) return;

    const allNumbers =
      gameType === "lotomania"
        ? Array.from(
            { length: definition.numberPoolMaxNumbers + 1 },
            (_, i) => i
          )
        : Array.from(
            { length: definition.numberPoolMaxNumbers },
            (_, i) => i + 1
          );

    const shuffled = allNumbers.sort(() => Math.random() - 0.5);
    this.selectedNumbersSubject.next(shuffled.slice(0, definition.maxPicks));
  }

  clearNumbers(): void {
    this.selectedNumbersSubject.next([]);
  }
}
