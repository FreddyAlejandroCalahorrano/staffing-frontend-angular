import {PersonCelula} from '../types/personCelula';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Celula} from '../types/celula';
import {CelulaService} from '@services/celula.service';
import {AsignacionesCelulasService} from '@services/asignaciones-celulas.service';

@Injectable()
export class PersonCelulaResolver implements Resolve<PersonCelula> {

  constructor(private asignacionesService: AsignacionesCelulasService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PersonCelula> {
    const {id} = route.params
    return this.asignacionesService.getPersonCelulaById(id)
  }
}

@Injectable()

export class ListCeluasResolver implements Resolve<Celula[]> {

  constructor(private celulaService: CelulaService,) {
  }

  resolve(): Promise<Celula[]> {
    return this.celulaService.getCelulas()
  }
}

