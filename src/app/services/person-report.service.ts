import {PaginationPersonReport} from '../types/paginationPersonReport';
import {environment} from '@environments/environment';
import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";

@Injectable()
export class PersonReportService {

  private rootUrl = environment.apiUrlReport;

  constructor(private http: HttpService) {
  }

  /**
   * Get Person Report by Filters
   * @param pageNo
   * @param pageSize
   * @param filters
   */
  public getPersonSearchPaged(pageNo: number, pageSize: number, filters: any): Promise<PaginationPersonReport> {
    return this.http.post(`${this.rootUrl}personReport/searchPaged`, {
      pageNo: pageNo,
      pageSize: pageSize,
      ...filters
    })
  }
}
