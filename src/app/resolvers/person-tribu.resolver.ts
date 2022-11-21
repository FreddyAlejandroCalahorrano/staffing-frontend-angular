import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PersonTribu} from "../types/personTribu";
import {Tribu} from "../types/tribu";
import {TribuService} from "@services/tribu.service";
import {AsignacionesTribusService} from '@services/asignaciones-tribus.service';

@Injectable()
export class PersonTribuResolver implements Resolve<PersonTribu> {

  constructor(
    private asignacionesService: AsignacionesTribusService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PersonTribu> {
    const {id} = route.params
    return this.asignacionesService.getPersonTribuById(id)

  }
}

@Injectable()
export class TribuResolver implements Resolve<Tribu[]> {

  constructor(
    private tribuService: TribuService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Tribu[]> {
    return this.tribuService.getTribu()

  }
}


@Injectable()
export class TipoRolTribuLiderResolver implements Resolve<string[]> {

  constructor(
    private asignacionesService: AsignacionesTribusService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string[]> {
    return this.asignacionesService.getTipoRolTribuLider()

  }
}
