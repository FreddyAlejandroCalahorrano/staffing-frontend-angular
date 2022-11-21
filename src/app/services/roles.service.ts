import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {environment} from '@environments/environment';

@Injectable()

export class RolesService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  /**
   * Get a list of the roles assigned to a person
   * @returns Promise<string[]>
   * @method Get
   */

  getRole(): Promise<string[]> {
    return this.http.get(this.rootUrl + 'role')
  }
}
