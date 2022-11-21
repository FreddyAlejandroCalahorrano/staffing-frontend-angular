import {Injectable} from '@angular/core';
import {HttpService} from '@pichincha/angular-sdk/http';
import {Chapter} from 'src/app/types/chapter';
import {PersonChapter} from 'src/app/types/personChapter';
import {environment} from '@environments/environment';

@Injectable()

export class ChapterService {

  private rootUrl = environment.apiUrl;

  constructor(private http: HttpService) { }

  /**
   * Get chapter types assignable to a person
   * @returns Promise<Chapter[]>
   * @method Get
   */

  public getChapters(): Promise<Chapter[]>{
    return this.http.get(this.rootUrl + 'chapter/')
  }

  /**
   * Get the chapters assigned to a person
   * @param id The id identifier of a person to obtain the chapters assigned to them
   * @returns Promise<PersonChapter>
   * @method Get
   */

  public getChapterByPerson(id: number): Promise<PersonChapter> {
    return this.http.get(this.rootUrl + 'personChapter/' + id)
  }

  /**
   * Allows to assign new chapter to a person
   * @param personChapter The PersonChapter object to be created
   * @returns
   * @method Post
   */
  public addPersonChapter(personChapter: PersonChapter) {
    return this.http.post(this.rootUrl + 'personChapter/', personChapter)
  }
}

