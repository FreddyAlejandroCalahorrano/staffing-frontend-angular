import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {HttpService} from "@pichincha/angular-sdk/http";
import {Celula} from "../types/celula";

@Injectable()

export class CelulaService {
  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  /**
   * Get all celulas created
   * @returns
   * @method Get
   */
  public getCelulas(): Promise<Celula[]> {
    return this.http.get(this.rootUrl + 'celula/')
  }

  /**
   * Allows you to update both the state and the properties of a celula
   * @param id Te id of the celula to update
   * @param celula The celula object to update
   * @returns Promise<Celula>
   * @method Put
   */

  public updateCelulaById(id: number, celula: Celula): Promise<Celula> {
    return this.http.put(this.rootUrl + 'celula/' + id, celula)
  }

  /**
   * Allows you to create a new celula
   * @param celula The celula object to be created
   * @returns Promise<Celula>
   * @method Post
   */

  public addCelula(celula: Celula): Promise<Celula> {
    return this.http.post(this.rootUrl + 'celula/', celula)
  }

  /**
   * Get List Celula by IdTribu
   * @param idTribu IdTribu
   */
  public getCelulaByTribu(idTribu: number) {
    return this.http.get(this.rootUrl + 'celula/celulasByTribu', {
      idTribu
    })
  }

  /**
   * Get List Celula by Array IdTribu
   * @param idsTribu IdsTribu
   */
  public getCelulaByArrayTribu(idsTribu: number[]) {
    return this.http.post(this.rootUrl + 'celula/celulasByidTribus', idsTribu)
  }

  /**
   * Allows to validate the name to be assigned to a celula
   * @method Get
   * @param celulaNameProduct
   */
  public validateCelulaNameProduct(celulaNameProduct: string) {
    return this.http.get(`${this.rootUrl}celula/usefulNameProduct?product=${celulaNameProduct.toUpperCase()}`)
  }
}
