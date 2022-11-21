import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Person} from "../types/person";
import {PersonService} from "@services/person.service";

@Injectable({
  providedIn: 'root'
})
export class PersonResolver implements Resolve<Person> {

  constructor(
    private personService: PersonService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Person> {
    const {id} = route.params
    return this.personService.getPersonById(id)
  }
}
