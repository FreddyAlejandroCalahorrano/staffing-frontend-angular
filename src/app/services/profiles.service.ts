import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {PersonProfile} from 'src/app/types/personProfile';
import {Profile} from 'src/app/types/profile';
import {environment} from '@environments/environment';

@Injectable()

export class ProfilesService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  /**
   * Get the profiles assignable to a person
   * @returns Promise<Profile[]>
   * @method Get
   */
  public getProfiles(): Promise<Profile[]> {
    return this.http.get(this.rootUrl + 'profile')
  }

  /**
   * Get the profiles assigned to a person
   * @param id The id identifier of a person to obtain the profiles assigned to them
   * @returns Promise<PersonProfile>
   * @method Get
   */

  public getProfilesByPerson(id: number): Promise<PersonProfile> {
    return this.http.get(this.rootUrl + 'personProfile/' + id)
  }

  /**
   * Allows assigning new profiles to a person
   * @param personProfiles
   * @method Post
   */
  public addPersonProfile(personProfiles: PersonProfile) {
    return this.http.post(this.rootUrl + 'personProfile/', personProfiles)
  }
}
