import {TestBed} from '@angular/core/testing';

import {ListCeluasResolver, PersonCelulaResolver} from './person-celula.resolver';
import {AsignacionesCelulasService} from "@services/asignaciones-celulas.service";
import {ActivatedRoute} from "@angular/router";
import {CelulaService} from "@services/celula.service";

describe('PersonCelulaResolver', () => {
  let resolverPersonCelula: PersonCelulaResolver;
  let resolverListCeluasResolver: ListCeluasResolver;
  let route: ActivatedRoute;
  let mockedAsignacionesCelulasService = {
    getPersonCelulaById: jest.fn(),
    getRoleCelula: jest.fn()
  };
  let mockedCelulaService = {
    getCelulas: jest.fn()
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[AsignacionesCelulasService,PersonCelulaResolver, ListCeluasResolver,
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id:5}}}},
        {provide: AsignacionesCelulasService, useValue: mockedAsignacionesCelulasService},
        {provide: CelulaService, useValue: mockedCelulaService}

      ]
    });
    resolverPersonCelula = TestBed.inject(PersonCelulaResolver);
    resolverListCeluasResolver = TestBed.inject(ListCeluasResolver);
    route = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(resolverPersonCelula).toBeTruthy();
    expect(resolverListCeluasResolver).toBeTruthy();
  });

  it('should call the method "getPersonCelulaById"', () => {
    const spy = jest.spyOn(mockedAsignacionesCelulasService, 'getPersonCelulaById')
      .mockImplementation(() => Promise.resolve())
    resolverPersonCelula.resolve(route.snapshot, null)
    expect(spy).toBeCalled()
  });

  it('should call the method "getCelulas"', () => {
    const spy = jest.spyOn(mockedCelulaService, 'getCelulas')
      .mockImplementation(() => Promise.resolve())
    resolverListCeluasResolver.resolve()
    expect(spy).toBeCalled()
  });

});
