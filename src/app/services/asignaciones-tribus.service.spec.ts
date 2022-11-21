import {AsignacionesTribusService} from './asignaciones-tribus.service';
import Mocked = jest.Mocked;
import {from, of} from "rxjs";
import DoneCallback = jest.DoneCallback;
import {PersonTribu} from "../types/personTribu";
import {Person} from "@angular/cli/utilities/package-json";
import {HttpErrorResponse} from "@angular/common/http";
import {PaginationPersonTribu} from "@interfaces/paginationPersonTribu";

describe('AsignacionesTribusService', () => {
  let asignacionesTribusService: AsignacionesTribusService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    asignacionesTribusService = new AsignacionesTribusService(httpServiceMock);
  });

  it('should be created', () => {
    expect(asignacionesTribusService).toBeTruthy();
  });

  it('should return all assignations to tribus with pagination and filters', (done: DoneCallback) => {

    const filter: string = ""
    const page: string = '1'
    const size: string = '5'
    const idTribu: string = ''


    const expectedPaginationPersonTribu: PaginationPersonTribu = {
      totalPages: 1,
      totalElements: 3,
      personTribuToList: [
        {
          "id": 6,
          "assignmentStartDate": "2022-05-11",
          "assignmentEndDate": null,
          "typeRoleLeader": "Lider Tecnico Tribu",
          "personTo": null,
          "tribuTo": {
            "id": 4,
            "tribuName": "TRIBU PRUEBA 2",
            "tribuCreationDate": "2022-05-05",
            "tribuFinishDate": null,
            "description": "prueba 2",
            "user": "luischi",
            "state": "ACTIVO"
          },
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 8,
          "assignmentStartDate": "2022-05-10",
          "assignmentEndDate": null,
          "typeRoleLeader": "Lider Tecnico Tribu",
          "personTo": null,
          "tribuTo": {
            "id": 3,
            "tribuName": "TRIBU PRUEBA",
            "tribuCreationDate": "2022-05-05",
            "tribuFinishDate": null,
            "description": "Tribu prueba",
            "user": "luischi",
            "state": "ACTIVO"
          },
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 5,
          "assignmentStartDate": "2022-05-06",
          "assignmentEndDate": "2022-05-06",
          "typeRoleLeader": "Lider de Tribu",
          "personTo":null,
          "tribuTo": {
            "id": 2,
            "tribuName": "BUSINESS CAPABILITIES",
            "tribuCreationDate": "2021-11-16",
            "tribuFinishDate": null,
            "description": "Business Capabilities",
            "user": "luischi",
            "state": "ACTIVO"
          },
          "user": "LuisChi",
          "state": "ACTIVO"
        }
        ]
    }

    httpServiceMock.get.mockReturnValueOnce([expectedPaginationPersonTribu])

    from(asignacionesTribusService.getPersonTribuSearchPaged(filter, page, size, idTribu))
      .subscribe((paginationPersonTribu) => {
        // expected value
        expect(paginationPersonTribu).toEqual(expectedPaginationPersonTribu)

        // personToList length is expected to be greater than 0
        expect(paginationPersonTribu.personTribuToList.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return expected tribu leader roles', (done: DoneCallback) => {
    const expectedRoles: string[] = [
      "Lider de Tribu",
      "Lider Tecnico Tribu"
    ]
    httpServiceMock.get.mockReturnValueOnce([expectedRoles]);

    from(asignacionesTribusService.getTipoRolTribuLider())
      .subscribe((roles) => {
        // expected not to be null
        expect(roles).not.toBeNull()

        // expected value
        expect(roles).toEqual(expectedRoles)

        // expected first value
        expect(roles[0]).toEqual(expectedRoles[0])

        // expected length
        expect(roles.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();
  })

  it('should return expected people assignations to Tribu', (done: DoneCallback) => {

    const expectedPersonTribuList: PersonTribu[] = [
      {
        "id": 1,
        "typeRoleLeader": "Lider de Tribu",
        "personTo": null,
        "tribuTo": {
          "id": 22,
          "tribuName": "CD",
          "tribuCreationDate": "2022-03-01",
          "tribuFinishDate": null,
          "description": null,
          "user": "luischi",
          "state": "ACTIVO"
        },
        "assignmentStartDate": null,
        "assignmentEndDate": null,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 3,
        "typeRoleLeader": "Lider Tecnico Tribu",
        "personTo": null,
        "tribuTo": {
          "id": 22,
          "tribuName": "CD",
          "tribuCreationDate": "2022-03-01",
          "tribuFinishDate": null,
          "description": null,
          "user": "luischi",
          "state": "ACTIVO"
        },
        "assignmentStartDate": null,
        "assignmentEndDate": null,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 2,
        "typeRoleLeader": "Lider Tecnico Tribu",
        "personTo": null,
        "tribuTo": {
          "id": 1,
          "tribuName": "Nueva Tribu",
          "tribuCreationDate": "2002-02-02",
          "tribuFinishDate": "2022-03-11",
          "description": null,
          "user": "luischi",
          "state": "ACTIVO"
        },
        "assignmentStartDate": null,
        "assignmentEndDate": null,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedPersonTribuList]);

    from(asignacionesTribusService.getAllPersonTribu())
      .subscribe((personTribuList) => {

        // expected value
        expect(personTribuList).toEqual(expectedPersonTribuList)

        personTribuList.forEach((personTribu) => {
          // tribuTo is expected not to be null
          expect(personTribu.tribuTo).not.toBeNull()

          // personTo is expected not to be null
          expect('personTo' in personTribu).toBeTruthy()
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();
  })

  it('should update typeRoleLeader (updated role: Lider de Tribu) in personCelula assignation', (done: DoneCallback) => {

    const updatedPersonTribu: PersonTribu = {
      "id": 3,
      "typeRoleLeader": "Lider de Tribu",
      "personTo": null,
      "tribuTo": {
        "id": 22,
        "tribuName": "CD",
        "tribuCreationDate": "2022-03-01",
        "tribuFinishDate": null,
        "description": null,
        "user": "luischi",
        "state": "ACTIVO"
      },
      "assignmentStartDate": null,
      "assignmentEndDate": null,
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.put.mockReturnValueOnce([updatedPersonTribu]);

    from(asignacionesTribusService.updatePersonTribu(updatedPersonTribu))
      .subscribe((personTribu) => {

        // expected value
        expect(personTribu).toEqual(updatedPersonTribu)

        // expected typeRoleLeader
        expect(personTribu.typeRoleLeader).toEqual(updatedPersonTribu.typeRoleLeader)

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();
  })

  it('should return personTribu by ID', (done: DoneCallback) => {

    const id = 4

    const expectedPersonTribu: PersonTribu = {
      "id": id,
      "typeRoleLeader": "Lider de Tribu",
      "personTo": {
        "id": 23,
        "ultimatix": null,
        "name": "Ester",
        "lastName": "Esposito",
        "email": "ester@test.com",
        "bornDay": 0,
        "bornMonth": 0,
        "bankEntryDate": "2022-05-11",
        "phoneNumber": "0979125545",
        "codeCountry": "DEU",
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 2,
        "idSeniority": 1
      },
      "tribuTo": {
        "id": 22,
        "tribuName": "CD",
        "tribuCreationDate": "2022-03-01",
        "tribuFinishDate": null,
        "description": null,
        "user": "luischi",
        "state": "ACTIVO"
      },
      "assignmentStartDate": null,
      "assignmentEndDate": null,
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.get.mockReturnValueOnce(of(expectedPersonTribu).toPromise());

    asignacionesTribusService.getPersonTribuById(id)
      .then((personCelula) => {
        // expected value
        expect(personCelula).toEqual(expectedPersonTribu)

        // expected id
        expect(personCelula.id).toEqual(expectedPersonTribu.id)

        // expected tribuTo
        expect(personCelula.tribuTo).toEqual(expectedPersonTribu.tribuTo)

        // expected personTo
        expect(personCelula.personTo).toEqual(expectedPersonTribu.personTo)

        done()
      })


    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should assign lider person to tribu', (done: DoneCallback) => {

    const newPersonTribu: PersonTribu = {
      "id": 4,
      "typeRoleLeader": "Lider de Tribu",
      "personTo": {
        "id": 4,
        "ultimatix": null,
        "name": "ALEJANDRO",
        "lastName": "RIVERA",
        "email": "alerivera@pichincha.com",
        "bornDay": 0,
        "bornMonth": 0,
        "bankEntryDate": null,
        "phoneNumber": "1234567890",
        "codeCountry": "ECU",
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 3,
        "idSeniority": 2
      },
      "tribuTo": {
        "id": 2,
        "tribuName": "RETAIL",
        "tribuCreationDate": "2002-02-02",
        "tribuFinishDate": null,
        "description": null,
        "user": "luischi",
        "state": "ACTIVO"
      },
      "assignmentStartDate": null,
      "assignmentEndDate": null,
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.post.mockReturnValueOnce([newPersonTribu]);

    from(asignacionesTribusService.addPersonTribu(newPersonTribu))
      .subscribe((personTribu) => {
        // expected value
        expect(personTribu).toEqual(newPersonTribu)

        // expected role person
        expect(personTribu.personTo.role).toEqual('Lider')

        // typeRoleLeader is expected  to be null
        expect(personTribu.typeRoleLeader).not.toBeNull()

        // expected tribuTo
        expect(personTribu.tribuTo).toEqual(newPersonTribu.tribuTo)

        // expected personTo
        expect(personTribu.personTo).toEqual(newPersonTribu.personTo)

        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })

  it('should return all people with Lider role', (done: DoneCallback) => {

    const expectedPersonList: Person[] = [
      {
        "id": 35,
        "name": "María",
        "lastName": "Magdalenaa",
        "email": "maria.magdalena@maria.com",
        "bornDate": "1998-12-20",
        "identificationCard": "1111111123",
        "phoneNumber": "1111111111",
        "homeAddress": "Cotocollao",
        "countryTo": {
          "code": "ECU",
          "description": "Ecuador"
        },
        "age": 23,
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "providerTo": {
          "id": 2,
          "providerName": "TCS",
          "user": "luischi",
          "state": "ACTIVO"
        }
      },
      {
        "id": 33,
        "name": "Marcelo",
        "lastName": "Molina",
        "email": "david.molina@asd.com",
        "bornDate": "2022-03-15",
        "identificationCard": "11111121111",
        "phoneNumber": "22222222222",
        "homeAddress": "cas",
        "countryTo": {
          "code": "AND",
          "description": "Andorra"
        },
        "age": 0,
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "providerTo": null
      },
      {
        "id": 41,
        "name": "Federico",
        "lastName": "Nuñez",
        "email": "nunez.federico@bp.com",
        "bornDate": "1998-01-20",
        "identificationCard": "1521354156",
        "phoneNumber": "1213212132",
        "homeAddress": "Rumiñahui",
        "countryTo": {
          "code": "ARE",
          "description": "Emiratos Árabes Unidos"
        },
        "age": 24,
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "providerTo": {
          "id": 2,
          "providerName": "TCS",
          "user": "luischi",
          "state": "ACTIVO"
        }
      },
      {
        "id": 36,
        "name": "Jesús",
        "lastName": "Perez",
        "email": "jesus@perez.com",
        "bornDate": "1998-12-20",
        "identificationCard": "1321312123",
        "phoneNumber": "1231231231",
        "homeAddress": "Diez de Agosto",
        "countryTo": {
          "code": "AND",
          "description": "Andorra"
        },
        "age": 23,
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "providerTo": {
          "id": 2,
          "providerName": "TCS",
          "user": "luischi",
          "state": "ACTIVO"
        }
      }
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedPersonList]);

    from(asignacionesTribusService.getPersonLeader())
      .subscribe((personList) => {
        // expected value
        expect(personList).toEqual(expectedPersonList)

        personList.forEach((person) => {
          // role person is expected not to be null
          expect(person.role).not.toBeNull()

          // expected role person
          expect(person.role).toEqual('Lider')
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return an error when the server returns a 500', (done: DoneCallback) => {

    const newPersonTribu: PersonTribu = {
      "id": 4,
      "typeRoleLeader": "Lider de Tribu",
      "personTo": null,
      "tribuTo": {
        "id": 2,
        "tribuName": "RETAIL",
        "tribuCreationDate": "2002-02-02",
        "tribuFinishDate": null,
        "description": null,
        "user": "luischi",
        "state": "ACTIVO"
      },
      "assignmentStartDate": null,
      "assignmentEndDate": null,
      "user": "luischi",
      "state": "ACTIVO"
    }

    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'La tribu ya tiene una person asignada con ese rol',
      status: 500, statusText: 'test'
    });

    httpServiceMock.post.mockRejectedValue(errorResponse);

    asignacionesTribusService.addPersonTribu(newPersonTribu)
      .then(() => {
        done.fail()
      })
      .catch((err) => {
        expect(err.error).toEqual('La tribu ya tiene una person asignada con ese rol')
        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })

});
