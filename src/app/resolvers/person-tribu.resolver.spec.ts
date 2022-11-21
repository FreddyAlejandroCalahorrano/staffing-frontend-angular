import {TestBed} from '@angular/core/testing';

import {PersonTribuResolver, TipoRolTribuLiderResolver, TribuResolver} from './person-tribu.resolver';
import {AsignacionesTribusService} from "@services/asignaciones-tribus.service";
import {TribuService} from "@services/tribu.service";
import {ActivatedRoute} from "@angular/router";

describe('PersonTribuResolver', () => {
  let resolverPersonTribu: PersonTribuResolver;
  let resolverTribu: TribuResolver;
  let resolverTipoRolTribuLider: TipoRolTribuLiderResolver;
  let route: ActivatedRoute;
  let mockedAsignacionesTribusService = {
    getPersonTribuById: jest.fn(),
    getTipoRolTribuLider: jest.fn()
  };
  let mockedTribusService = {
    getTribu: jest.fn()
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TribuService, PersonTribuResolver, TribuResolver, TipoRolTribuLiderResolver,
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id:5}}}},
        {provide: AsignacionesTribusService, useValue: mockedAsignacionesTribusService},
        {provide: TribuService, useValue: mockedTribusService}
      ]
    });
    resolverPersonTribu = TestBed.inject(PersonTribuResolver);
    resolverTribu =  TestBed.inject(TribuResolver);
    resolverTipoRolTribuLider =  TestBed.inject(TipoRolTribuLiderResolver);
    route = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(resolverPersonTribu).toBeTruthy();
    expect(resolverTribu).toBeTruthy();
    expect(resolverTipoRolTribuLider).toBeTruthy();
  });

  it('should call the method "getPersonTribuById"', () => {
    const spy = jest.spyOn(mockedAsignacionesTribusService, 'getPersonTribuById')
      .mockImplementation(() => Promise.resolve())
    resolverPersonTribu.resolve(route.snapshot, null)
    expect(spy).toBeCalled()
  });

  it('should call the method "getTribu"', () => {
    const spy = jest.spyOn(mockedTribusService, 'getTribu')
      .mockImplementation(() => Promise.resolve())
    resolverTribu.resolve(null, null)
    expect(spy).toBeCalled()
  });

  it('should call the method "getTipoRolTribuLider"', () => {
    const spy = jest.spyOn(mockedAsignacionesTribusService, 'getTipoRolTribuLider')
      .mockImplementation(() => Promise.resolve())
    resolverTipoRolTribuLider.resolve(null, null)
    expect(spy).toBeCalled()
  })
});
