import {PersonService} from './person.service';
import {Person} from "../types/person";
import {from} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PaginationPerson} from "../types/paginationPerson";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;


describe('PersonService', () => {
  let personService: PersonService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    personService = new PersonService(httpServiceMock);
  })

  it('should be created', () => {
    expect(personService).toBeTruthy();
  });

  it('should return all people created', (done: DoneCallback) => {

    const expectedPeople: Person[] = [
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
      },
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
        "id": 16,
        "ultimatix": null,
        "name": "Andres",
        "lastName": "Cajamanrca",
        "email": "acajamaefrca@hotmail.com",
        "bornDay": null,
        "bornMonth": 1,
        "bankEntryDate": null,
        "phoneNumber": null,
        "codeCountry": "ECU",
        "role": "Staff",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 2,
        "idSeniority": 1
      },
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedPeople])

    from(personService.getPeople())
      .subscribe((people) => {
        // expected value
        expect(people).toEqual(expectedPeople)

        // chapters length is expected to be greater than 0
        expect(people.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return all people created with pagination and filters', (done: DoneCallback) => {

    const filter: string = "u"
    const page: number = 2
    const size: number = 5
    const role: string = "Lider"


    const expectedPaginationPerson: PaginationPerson = {
      "totalPages": 2,
      "totalElements": 1,
      "personToList": [
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
        },
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
          "id": 16,
          "ultimatix": null,
          "name": "Hugo",
          "lastName": "Cajamanrca",
          "email": "acajamaefrca@hotmail.com",
          "bornDay": null,
          "bornMonth": 1,
          "bankEntryDate": null,
          "phoneNumber": null,
          "codeCountry": "ECU",
          "role": "Staff",
          "user": "luischi",
          "state": "ACTIVO",
          "idProvider": 2,
          "idSeniority": 1
        },
      ]
    }

    httpServiceMock.get.mockReturnValueOnce([expectedPaginationPerson])

    from(personService.getPeopleSearchPaged(filter, page, size, role))
      .subscribe((paginationPerson) => {
        // expected value
        expect(paginationPerson).toEqual(expectedPaginationPerson)

        // personToList length is expected to be greater than 0
        expect(paginationPerson.personToList.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return person by id', (done: DoneCallback) => {

    const personId = 19

    const expectedPerson: Person = {
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

    httpServiceMock.get.mockReturnValueOnce([expectedPerson])

    from(personService.getPersonById(personId))
      .subscribe((person) => {
        // expected value
        expect(person).toEqual(expectedPerson)

        // Person Name is expected to be "Alexis"
        expect(person.name).toEqual(expectedPerson.name)

        // Person State is expected to be "ACTIVO"
        expect(person.state).toEqual('ACTIVO')

        // expected person id
        expect(person.id).toEqual(personId)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should update person and return the updated person', (done: DoneCallback) => {

    const updatedPerson: Person = {
      "id": 28,
      "ultimatix": 2070049,
      "name": "Alexis",
      "lastName": "Chichandrina",
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
    }

    httpServiceMock.put.mockReturnValueOnce([updatedPerson])

    from(personService.updatePerson(updatedPerson, updatedPerson.id))
      .subscribe((person) => {
        // expected value
        expect(person).toEqual(updatedPerson)

        // Person Name is expected to be "Alexis"
        expect(person.name).toEqual('Alexis')

        // Person State is expected to be "ACTIVO"
        expect(person.state).toEqual('ACTIVO')

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();

  })

  it('should add person and return the added person', (done: DoneCallback) => {

    const newPerson: Person = {
      "id": 43,
      "ultimatix": null,
      "name": "Carolina",
      "lastName": "Saez",
      "email": "lespinoza@pichincha.com",
      "bornDay": 0,
      "bornMonth": 0,
      "bankEntryDate": null,
      "phoneNumber": null,
      "codeCountry": "ECU",
      "role": "Staff",
      "user": "luischi",
      "state": "ACTIVO",
      "idProvider": 3,
      "idSeniority": 2
    }

    httpServiceMock.post.mockReturnValueOnce([newPerson])

    from(personService.addPerson(newPerson))
      .subscribe((person) => {
        // expected value
        expect(person).toEqual(newPerson)

        // Person Name is expected to be "Carolina Saez"
        expect(`${person.name} ${person.lastName}`).toEqual('Carolina Saez')

        // Person State is expected to be "ACTIVO"
        expect(person.state).toEqual('ACTIVO')

        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })

  it('should remove person if the person has not assignments', (done: DoneCallback) => {

    const removedPerson: Person = {
      "id": 43,
      "ultimatix": null,
      "name": "Carolina",
      "lastName": "Saez",
      "email": "lespinoza@pichincha.com",
      "bornDay": 0,
      "bornMonth": 0,
      "bankEntryDate": null,
      "phoneNumber": null,
      "codeCountry": "ECU",
      "role": "Staff",
      "user": "luischi",
      "state": "INACTIVO",
      "idProvider": 3,
      "idSeniority": 2
    }

    httpServiceMock.put.mockReturnValueOnce([removedPerson])

    from(personService.removePerson(removedPerson, removedPerson.id))
      .subscribe((person) => {
        // expected value
        expect(person).toEqual(removedPerson)

        // Person State is expected to be "INACTIVO"
        expect(person.state).toEqual('INACTIVO')

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();

  })

  it('should return an error if the person to delete has assignments', (done: DoneCallback) => {

    const removedPerson: Person = {
      "id": 33,
      "ultimatix": 2070049,
      "name": "Marcelo",
      "lastName": "Molina",
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
    }

    const errorResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'La person tiene asignaciones',
      status: 500, statusText: 'test'
    });

    httpServiceMock.put.mockRejectedValue(errorResponse)

    personService.removePerson(removedPerson, removedPerson.id)
      .then(() => {
        done.fail()
      })
      .catch((err) => {
        expect(err.error).toEqual('La person tiene asignaciones')
        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();

  })

  it('should remove person and his assignments', (done: DoneCallback) => {
    const removedPerson: Person =  {
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
    }

    const responseMessage: string = "Asignaciones eliminadas"

    httpServiceMock.put.mockReturnValueOnce([responseMessage])

    from(personService.eliminationAssignmentPerson(removedPerson))
      .subscribe((response) => {
        //expected response message
        expect(response).toEqual(responseMessage)

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();

  })

  it('should return if the email is valid', (done: DoneCallback) => {

    const email = "josue.arias@fake.ec"

    const expectedResponse: string = "El recurso con el Email josue.arias@fake.ec es válido"

    httpServiceMock.get.mockReturnValueOnce([expectedResponse]);

    from(personService.validateEmailPerson(email))
      .subscribe((response) => {
        // expected value
        expect(response).toEqual(expectedResponse)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })
});
