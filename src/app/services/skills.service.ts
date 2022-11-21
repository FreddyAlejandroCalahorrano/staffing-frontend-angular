import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {PersonSkills} from 'src/app/types/personSkills';
import {Skill} from 'src/app/types/skill';
import {environment} from '@environments/environment';
import {from, Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Injectable()

export class SkillsService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) {
  }

  /**
   * Get a list of type of skills that can be assigned to a skill
   * @returns Promise<string[]>
   * @method Get
   */
  public getTypeSkills(): Promise<string[]> {
    return this.http.get(`${this.rootUrl}typeSkills`)
  }

  /**
   * Get a list of type of skills that can be assigned to a skill
   * @returns Promise<string[]>
   * @method Get
   */
  public getTypeSkillsSelect(): Observable<any[]> {
    return from(this.getTypeSkills())
      .pipe(
        map(types =>
          types.map(type =>
            ({
              value: type,
              label: type,
            })
          )
        )
      )
  }

  /**
   * Gets the skills that a person has assigned
   * @param id The identifier id of the person
   * @returns Promise<PersonSkills>
   * @method Get
   */
  public getSkillsByPersonId(id: number): Promise<PersonSkills> {
    return this.http.get(`${this.rootUrl}personSkill/${id}`)

  }

  /**
   * Allows you to add skills to a person
   * @param personSkills The personSkill object to be assigned
   * @method Post
   */
  public addPersonSkills(personSkills: PersonSkills): Promise<PersonSkills> {
    return this.http.post(`${this.rootUrl}personSkill`, personSkills)
  }

  /**
   * Allows you to remove skills to a person
   * @param personSkill The personSkill object to be removed
   * @method Put
   */

  public deletePersonSkill(personSkill: any) {
    return this.http.put(`${this.rootUrl}personSkill`, personSkill)
  }

  /**
   * Get a list with the skills created
   * @returns Promise<Skill[]>
   * @method Get
   */

  public getSkills(): Promise<Skill[]> {
    return this.http.get(`${this.rootUrl}skill`)
  }

  /**
   * Gets the list of skills expect deletedSkills
   * @param deletedSkills
   * @returns Promise<Skill[]>
   *
   */
  public getSkillsExpect(deletedSkills: Skill[]): Promise<Skill[]> {
    return from(this.getSkills()).pipe(
      map((skills: Skill[]) => {
        return skills.filter((skill) => {
          let noDeletedSkill: boolean = true
          deletedSkills.forEach(({id}) => {
            if (skill.id == id) {
              noDeletedSkill = false
            }
          })
          return noDeletedSkill ? skill : null;
        })
      }),
    ).toPromise()
  }

  /**
   * Allows you to upgrade the skill type to a skill
   * @param skill The skill object to be updated
   * @param id The identifier id of the skill
   * @returns Promise<Skill>
   * @method Put
   */
  public updateSkill(skill: Skill, id: number): Promise<Skill> {
    return this.http.put(this.rootUrl + 'skill/' + id, skill)
  }

  /**
   * Allows to add a new skill
   * @param skill The skill object to be added
   * @returns Promise<Skill>
   * @method Post
   */
  public addSkill(skill: Skill): Promise<Skill> {
    return this.http.post(`${this.rootUrl}skill`, skill)
  }

  /**
   * Get a list with the skills by profile id
   * @param profileId The profile id
   * @returns Promise<Skill[]>
   * @method Get
   */

  public getSkillsByProfileId(profileId: number): Promise<Skill[]> {
    return this.http.get(`${this.rootUrl}skill/searchByProfile?idProfile=${profileId}`)
  }

}
