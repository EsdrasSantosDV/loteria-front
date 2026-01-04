import { environment } from "@/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LotteryDefinitionListItem } from "../../../shared/interfaces/lottery-definition-list-item.interface";
import { Observable } from "rxjs";
import { PageResult } from "@/app/shared/interfaces/page-result";
import { GetLotteryDefinitionsRequestDto } from "@/app/shared/dto/get-lottery-definitions.request.dto";

@Injectable({
  providedIn: "root",
})
export class LotteryDefinitionsHttpService {
  constructor(private http: HttpClient) {}
  getLotteryDefinitions(
    dto: GetLotteryDefinitionsRequestDto
  ): Observable<PageResult<LotteryDefinitionListItem>> {
    const params = new HttpParams()
      .set("page", dto.page)
      .set("pageSize", dto.pageSize);
    return this.http.get<PageResult<LotteryDefinitionListItem>>(
      `${environment.backendUrl}/loteria/definitions`,
      { params }
    );
  }
}
