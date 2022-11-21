import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Provider} from 'src/app/types/provider';
import {environment} from '@environments/environment';

@Injectable()

export class ProvidersService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  /**
   * Gets a list of providers assignable to a person
   * @returns Promise<Provider[]>
   * @method Get
   */

  public getProviders(): Promise<Provider[]> {
    return this.http.get(this.rootUrl + 'provider/')
  }

}
