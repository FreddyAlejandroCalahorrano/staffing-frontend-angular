import {TestBed} from '@angular/core/testing';

import {PersonResolver} from './person.resolver';
import {PersonService} from "@services/person.service";
import {ActivatedRoute} from "@angular/router";

describe('PersonResolver', () => {
  let resolver: PersonResolver;
  let route: ActivatedRoute;
  let mockedPersonService = {
    getPersonById: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonResolver,
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id:5}}}},
        {provide: PersonService, useValue: mockedPersonService}
      ]
    });
    resolver = TestBed.inject(PersonResolver);
    route = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should call the method "getPersonById"', () => {
    const spy = jest.spyOn(mockedPersonService, 'getPersonById')
      .mockImplementation(() => Promise.resolve())
    resolver.resolve(route.snapshot, null)
    expect(spy).toBeCalled()
  });
});
