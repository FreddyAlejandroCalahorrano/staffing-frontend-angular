import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {PersonCelula} from '../types/personCelula';
import {environment} from "@environments/environment";
import {PaginationPersonCelula} from "../types/paginationPersonCelula";
import {PersonCelulaPercentage} from "../types/personCelulaPercentage";

@Injectable()
export class AsignacionesCelulasService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  /**
   * get all people assignable to a celula
   */
  public getAllPersonCelula(): Promise<PersonCelula[]> {
    return this.http.get(this.rootUrl + 'personCelula')
  }

  /**
   * Get all assignments to celulas with pagination and filters
   * @param filter filter
   * @param page selected page
   * @param size assignments per page
   * @param idCelula celula filter
   * @returns Promise<PaginationPersonCelula>
   * @method Post
   */

  public getPersonCelulaSearchPaged(filter: string, page: number, size: number, idCelula: number): Promise<PaginationPersonCelula> {
    return this.http.post(`${this.rootUrl}personCelula/searchPaged`, {
      pageNo: page,
      pageSize: size,
      filter: filter,
      idCelula: idCelula
    })
  }

  /**
   * Update existing people in a celula
   * @param personCelula the person object being updated
   * @returns Promise<PersonCelula>
   * @method Put
   */
  public updatePersonCelula(personCelula: PersonCelula): Promise<PersonCelula> {
    return this.http.put(`${this.rootUrl}personCelula/${personCelula.id}`, {
      ...personCelula,
      user: "luischi",
    })
  }

  public deletePersonCelula(idPersonCelula: number, dateEnd: any): Promise<PersonCelula> {
    return this.http.put(`${this.rootUrl}personCelula/delete/${idPersonCelula}`, dateEnd)
  }

  /**
   * Assign a new cell person, can be leader or staff
   * @param personCelula the person object being assign
   * @returns Promise<PersonCelula>
   * @method Post
   */

  public addPersonCelula(personCelula: PersonCelula): Promise<PersonCelula> {
    return this.http.post(`${this.rootUrl}personCelula`, personCelula)
  }

  /**
   * Get a person assigned to a celula through their id
   * @param id The identifier id of the person celula
   * @returns Promise<PersonCelula>
   * @method Get
   */

  public getPersonCelulaById(id: number): Promise<PersonCelula> {
    return this.http.get(`${this.rootUrl}personCelula/${id}`)
  }

  /**
   * Get the person celula percentage list
   * @param personId The identifier id of the person
   * @returns Promise<PersonCelulaPercentage[]>
   * @method Get
   */
  public getPercentageListByPersonId(personId: number): Promise<PersonCelulaPercentage[]> {
    return this.http.get(`${this.rootUrl}personCelula/personPercentage/${personId}`)
  }

  /**
   * Get a list of reasons to close an assignmentç
   */
  public getListExit(): Promise<object[]> {
    return this.http.get(this.rootUrl + 'exit')
  }
}
