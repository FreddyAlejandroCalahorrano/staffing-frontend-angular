import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {PersonService} from '@services/person.service';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';

import {FormAsignacionesModalComponent} from './form-asignaciones-modal.component';
import {first} from "rxjs/operators";

describe('FormAsignacionesModalComponent', () => {
  let component: FormAsignacionesModalComponent;
  let fixture: ComponentFixture<FormAsignacionesModalComponent>;
  let compiled: HTMLElement;
  let mockedPersonService = {
    getPeopleSearchPaged: jest.fn().mockImplementation(() => Promise.resolve(
      {
        "totalPages": 2,
        "totalElements": 10,
        "personToList": [
          {
            "id": 25,
            "ultimatix": null,
            "name": "Andres",
            "lastName": "Araujo",
            "email": "andres@araujo.com",
            "bornDay": 31,
            "bornMonth": 12,
            "bankEntryDate": "2022-05-04",
            "phoneNumber": "0979794949",
            "codeCountry": "AFG",
            "role": "Staff",
            "user": "luischi",
            "state": "ACTIVO",
            "idProvider": 2,
            "idSeniority": 1
          },
          {
            "id": 3,
            "ultimatix": 2070056,
            "name": "LUIS EDUARDO",
            "lastName": "CHICHANDA GARCIA",
            "email": "lchichan@pichincha.com",
            "bornDay": 31,
            "bornMonth": 12,
            "bankEntryDate": null,
            "phoneNumber": "0980226810",
            "codeCountry": "ECU",
            "role": "Staff",
            "user": "luischi",
            "state": "ACTIVO",
            "idProvider": 2,
            "idSeniority": 2
          },
          {
            "id": 14,
            "ultimatix": 2070049,
            "name": "Andreshinos",
            "lastName": "Cajamanrca",
            "email": "acajamarca@hotmail.com",
            "bornDay": 0,
            "bornMonth": 0,
            "bankEntryDate": null,
            "phoneNumber": null,
            "codeCountry": "ECU",
            "role": "Staff",
            "user": "luischi",
            "state": "ACTIVO",
            "idProvider": 2,
            "idSeniority": 4
          },
          {
            "id": 18,
            "ultimatix": 12345678,
            "name": "karen",
            "lastName": "chichanda",
            "email": "eduardo@gmail.com",
            "bornDay": 0,
            "bornMonth": 0,
            "bankEntryDate": "2022-05-10",
            "phoneNumber": "0987654321",
            "codeCountry": "AFG",
            "role": "Staff",
            "user": "luischi",
            "state": "ACTIVO",
            "idProvider": 2,
            "idSeniority": 2
          },
          {
            "id": 19,
            "ultimatix": null,
            "name": "ALBERTO",
            "lastName": "ALBERTO",
            "email": "albeto@gmail.com",
            "bornDay": 28,
            "bornMonth": 2,
            "bankEntryDate": "2022-05-11",
            "phoneNumber": "0983412571",
            "codeCountry": "AND",
            "role": "Staff",
            "user": "luischi",
            "state": "ACTIVO",
            "idProvider": 2,
            "idSeniority": 2
          }
        ]
      }
    )),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        BootstrapModalModule,
      ],
      declarations: [FormAsignacionesModalComponent],
      providers: [
        {provide: PersonService, useValue: mockedPersonService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAsignacionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the text of the "titulo"', () => {
    component.titleModal = "Titulo"
    fixture.detectChanges()
    expect(compiled.querySelector(".modal-title").textContent).toEqual(' Titulo ')
  });

  it('should called method "getPeopleSearchPaged" when emit value BehaviorSubject(dataPaginationPerson$)', (done) => {
    const spyMethod = mockedPersonService.getPeopleSearchPaged
      .mockImplementation(() => Promise.resolve({}))

    component.paginationPerson$
      .pipe(first())
      .subscribe({
        next: () => {


          expect(
            spyMethod
          ).toBeCalled();

          expect(
            component.showPagination
          ).toBeTruthy();

        },
        complete: () => done()
      })

    component.dataPaginationPerson$.next({size: 0, page: 0})
  })

  it('should called method "next" from [dataPaginationPerson$] when call setupPagination', () => {
    const spyNextSubject = jest.spyOn(component.dataPaginationPerson$, 'next')
    component.setupPagination({sizePage: 5, currentPage: 1, start: 0, end: 0})
    expect(
      spyNextSubject
    ).toBeCalled()
  })
/*
  it('', (done) => {
    component.filter.patchValue('Prueba')
    fixture.detectChanges()
    setTimeout(() => {
      expect(component.page).toEqual(1)
      done()
    },600)
  })*/

});
