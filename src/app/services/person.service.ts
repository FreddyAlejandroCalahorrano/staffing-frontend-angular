import {Injectable} from '@angular/core';
import {HttpService} from "@pichincha/angular-sdk/http";
import {Person} from "../types/person";
import {environment} from "@environments/environment";
import {PaginationPerson} from "../types/paginationPerson";

@Injectable()

export class PersonService {


  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  /**
   * Get all people created
   * @returns Promise<Person[]>
   * @method Get
   */

  public getPeople(): Promise<Person[]> {
    return this.http.get(this.rootUrl + 'person')
  }

  /**
   * Get all people created with pagination and filters
   * @param filter filter
   * @param page selected page
   * @param size people per page
   * @param role people role
   * @returns Promise<PaginationPerson>
   * @method Get
   */

  public getPeopleSearchPaged(filter: string, page: number, size: number, role: string): Promise<PaginationPerson> {
    return this.http.get(`${this.rootUrl}person/searchPaged?filter=${filter}&page=${page}&size=${size}&role=${role}`)
  }

  /**
   * Get a person by id
   * @param id The id of the person
   * @returns Promise<Person>
   * @method Get
   */

  public getPersonById(id: number): Promise<Person> {
    return this.http.get(`${this.rootUrl}person/${id}`)
  }

  /**
   * Allows you to update the properties of a person
   * @param person The person object to update
   * @param id Te id of the person to update
   * @returns Promise<Person>
   * @method Put
   */
  public updatePerson(person: Person, id: number): Promise<Person> {
    return this.http.put(this.rootUrl + 'person/' + id, person)
  }

  /**
   * Allows you to create a new person
   * @param person The person object to create
   * @returns Promise<Person>
   * @method Post
   */

  public addPerson(person: Person): Promise<Person> {
    return this.http.post(this.rootUrl + 'person', person)
  }

  /**
   * Allows to remove a person
   * @param person The person object to remove
   * @param id Te id of the person to remove
   * @returns Promise<Person>
   * @method Put
   */

  public removePerson(person: Person, id: number): Promise<Person> {
    return this.http.put(this.rootUrl + 'person', person)
  }

  /**
   * Allows you to delete all the assignments that a person has
   * @param person The person object to remove
   * @returns Promise<Person>ç
   * @method Put
   */

  public eliminationAssignmentPerson(person: Person): Promise<string> {
    return this.http.put(this.rootUrl + 'person/eliminationAssignment', person)
  }


  /**
   * Allows to validate the email to be assigned to a person
   * @param email The email that will be assigned
   * @method Get
   */

  public validateEmailPerson(email: string) {
    return this.http.get(this.rootUrl + 'person/email/' + email)
  }

}
