import {Seniority} from './../types/Seniority';
import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {environment} from '@environments/environment';

@Injectable()

export class SeniorityService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  /**
   * Get a list of seniority assignable to a person
   * @returns Promise<Seniority[]>
   * @method Get
   */

   public getSeniority(): Promise<Seniority[]> {
    return this.http.get(this.rootUrl + 'seniority')
  }
}
