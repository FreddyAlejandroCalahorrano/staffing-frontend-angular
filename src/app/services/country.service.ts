import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Country} from 'src/app/types/country';
import {environment} from '@environments/environment';

@Injectable()

export class CountryService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  /**
   * Get a list of countries assignable to a person
   * @returns Promise<Country[]>
   * @method Get
   */

  public getCountry(): Promise<Country[]> {
    return this.http.get(this.rootUrl + 'country')
  }
}
