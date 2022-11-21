import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {environment} from '@environments/environment';
import {Person} from '@interfaces/person';
import {PersonTribu} from '@interfaces/personTribu';
import {PaginationPersonTribu} from "@interfaces/paginationPersonTribu";

@Injectable()
export class AsignacionesTribusService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }
  /**
   * Get all people (Lideres) assignable to a tribu
   * @returns Promise<PersonTribu[]>
   * @method Get
   */

  public getAllPersonTribu(): Promise<PersonTribu[]> {
    return this.http.get(this.rootUrl + 'personTribu')
  }

  /**
   * Get all assignments to tribus with pagination and filters
   * @param filter filter
   * @param page selected page
   * @param size assignments per page
   * @param idTribu tribu filter
   * @returns Promise<PaginationPersonTribu>
   * @method Get
   */

  public getPersonTribuSearchPaged(filter: string, page: string, size: string, idTribu: string): Promise<PaginationPersonTribu> {
    return this.http.get(
      `${this.rootUrl}personTribu/searchPaged?page=${page}&size=${size}&filter=${filter}&idTribu=${idTribu}`
    )
  }

  /**
   * Updates the record of a person assigned to a tribu
   * @param personTribu The person object being updated
   * @returns Promise<PersonTribu>
   * @method Put
   */

  public updatePersonTribu(personTribu: PersonTribu): Promise<PersonTribu> {
    return this.http.put(`${this.rootUrl}personTribu/${personTribu.id}`, personTribu)
  }

  /**
   * Deletes the record of a person assigned to a tribu
   * @param personTribu The person object being updated
   * @param date
   * @returns Promise<PersonTribu>
   * @method Put
   */

  public deletePersonTribu(id: number, date: any): Promise<PersonTribu> {
    return this.http.put(`${this.rootUrl}personTribu/delete/${id}`, date)
  }

  /**
   * Get a person assigned to a tribu through their id
   * @param id The identifier id of the selected person
   * @returns Promise<PersonTribu>
   * @method Get
   */

  public getPersonTribuById(id: number): Promise<PersonTribu> {
    return this.http.get(`${this.rootUrl}personTribu/${id}`)
  }

  /**
   * Get the role types assignable to the tribu leader
   * @returns Promise<string[]>
   * @method Get
   */

  public getTipoRolTribuLider(): Promise<string[]>{
    return this.http.get(`${this.rootUrl}roleLeaderTribu`)
  }

  /**
   * Assign a new leader to tribu
   * @param personTribu The person object being assign
   * @returns Promise<PersonTribu>
   * @method Post
   */

  public addPersonTribu(personTribu: PersonTribu): Promise<PersonTribu> {
    return this.http.post(`${this.rootUrl}personTribu`, personTribu)
  }

  /**
   * Get the leaders assigned to a tribu
   * @returns Promise<Person[]>
   * @method Get
   */

  public getPersonLeader(): Promise<Person[]> {
    return this.http.get(this.rootUrl + 'person/leader')
  }
}
