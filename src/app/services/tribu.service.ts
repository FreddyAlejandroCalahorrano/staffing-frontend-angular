import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {environment} from '@environments/environment';
import {Tribu} from '../types/tribu';

@Injectable()

export class TribuService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  /**
   * Get all tribus created
   * @returns Promise<Tribu[]>
   * @method Get
   */

  public getTribu(): Promise<Tribu[]> {
    return this.http.get(this.rootUrl + 'tribu/')
  }

  /**
   * Allows to add a new tribu
   * @param tribu The tribu object to be created
   * @returns Promise<Tribu>
   * @method Post
   */
  public addTribu(tribu: Tribu): Promise<Tribu> {
    return this.http.post(this.rootUrl + 'tribu/', tribu)
  }

  /**
   * Allows you to upgrade a tribu
   * @param tribu The tribu object to update
   * @param id Te id of the tribu to update
   * @returns Promise<Tribu>
   * @method Put
   */

  public updateTribu(tribu: Tribu, id: number): Promise<Tribu> {
    return this.http.put(this.rootUrl + 'tribu/' + id, tribu)
  }

  /**
   * Allows to validate the name to be assigned to a tribu
   * @param tribuName The name that will be assigned
   * @method Get
   */

  public validateTribuName(tribuName: string) {
    return this.http.get(this.rootUrl + 'tribu/tribuName/' + tribuName.toUpperCase())
  }

}
