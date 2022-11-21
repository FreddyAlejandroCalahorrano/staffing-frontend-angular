import {AsignacionesCelulasService} from './asignaciones-celulas.service';
import {from} from "rxjs";
import {PersonCelula} from "../types/personCelula";
import {PaginationPersonCelula} from "../types/paginationPersonCelula";
import {PersonCelulaPercentage} from "../types/personCelulaPercentage";
import DoneCallback = jest.DoneCallback;
import Mocked = jest.Mocked;
import {generatePaginationPersonCelula} from "@interfaces/mocks/paginationPersonCelula.mock";

describe('AsignacionesCelulasService', () => {
  let asignacionesCelulasService: AsignacionesCelulasService;
  let httpServiceMock: Mocked<any>
  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    asignacionesCelulasService = new AsignacionesCelulasService(httpServiceMock);
  });

  it('should be created', () => {
    expect(asignacionesCelulasService).toBeTruthy();
  });

  it('should return all assignations to celulas with pagination and filters', (done: DoneCallback) => {

    const filter: string = ""
    const page: number = 2
    const size: number = 5
    const idCelula: number = null

    const expectedPaginationPersonCelula: PaginationPersonCelula = generatePaginationPersonCelula(
      {
        totalPages: 4,
        totalElements: 20
      }
    )

    httpServiceMock.post.mockResolvedValue(expectedPaginationPersonCelula)

    asignacionesCelulasService.getPersonCelulaSearchPaged(filter, page, size, idCelula)
      .then((paginationPersonCelula) => {
        expect(paginationPersonCelula.personCelulaToList.length).toBeGreaterThan(0)
        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })

  it('should return expected people assignations to celulas', (done: DoneCallback) => {

    const expectedPersonCelulaList: PersonCelula[] = [
      {
        "id": 4,
        "assignmentStartDate": null,
        "assignmentEndDate": null,
        "tentativeAssignmentEndDate": null,
        "allocationPercentage": null,
        "personTo": null,
        "celulaTo": {
          "id": 24,
          "celulaCreationDate": "2022-03-01",
          "celulaFinishDate": null,
          "celulaNameSquad": "squad",
          "celulaNameProduct": "producto",
          "description": "bgfbgf",
          "idTribu": 2,
          "tribuName": "BUSINESS CAPABILITIES",
          "user": "luischi",
          "state": "ACTIVO"
        },
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 2,
        "assignmentStartDate": null,
        "assignmentEndDate": null,
        "tentativeAssignmentEndDate": null,
        "allocationPercentage": null,
        "personTo": null,
        "celulaTo": {
          "id": 30,
          "celulaCreationDate": "2022-03-18",
          "celulaFinishDate": null,
          "celulaNameSquad": "Prueba Descricion",
          "celulaNameProduct": "Prueba Descricion",
          "description": "descripcion prueba",
          "idTribu": 2,
          "tribuName": "BUSINESS CAPABILITIES",
          "user": "luischi",
          "state": "ACTIVO"
        },
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedPersonCelulaList]);

    from(asignacionesCelulasService.getAllPersonCelula())
      .subscribe((personCelulaList) => {

        // expected value
        expect(personCelulaList).toEqual(expectedPersonCelulaList)

        personCelulaList.forEach((personCelula) => {
          // celulaTo is expected not to be null
          expect(personCelula.celulaTo).not.toBeNull()

          // personTo is expected not to be null
          expect('personTo' in personCelula).toBeTruthy()
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should update typeRoleLeader (updated role: PL) in personCelula assignation', (done: DoneCallback) => {

    const updatedPersonCelula: PersonCelula = {
      "id": 2,
      "assignmentStartDate": null,
      "assignmentEndDate": null,
      "tentativeAssignmentEndDate": null,
      "allocationPercentage": null,
      "personTo": null,
      "celulaTo": {
        "id": 30,
        "celulaCreationDate": "2022-03-18",
        "celulaFinishDate": null,
        "celulaNameSquad": "Prueba Descricion",
        "celulaNameProduct": "Prueba Descricion",
        "description": "descripcion prueba",
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "user": "luischi",
        "state": "ACTIVO"
      },
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.put.mockReturnValueOnce([updatedPersonCelula]);

    from(asignacionesCelulasService.updatePersonCelula(updatedPersonCelula))
      .subscribe((personCelula) => {

        // expected value
        expect(personCelula).toEqual(updatedPersonCelula)

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();

  })

  it('should assign staff person to celula', (done: DoneCallback) => {

    const newPersonCelula: PersonCelula = {
      "id": 5,
      "assignmentStartDate": "2022-03-08",
      "assignmentEndDate": "2022-03-30",
      "tentativeAssignmentEndDate": "2022-03-31",
      "allocationPercentage": null,
      "personTo": {
        "id": 5,
        ultimatix: null,
        "name": "Felipao",
        "lastName": "Garcia",
        "email": "luis69@gmail.com",
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
      },
      "celulaTo": {
        "id": 9,
        "celulaCreationDate": "2022-02-02",
        "celulaFinishDate": "2022-03-24",
        "celulaNameSquad": "squad9",
        "celulaNameProduct": "producto9",
        "description": "dvdsvdsd",
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "user": "luischi",
        "state": "ACTIVO"
      },
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.post.mockReturnValueOnce([newPersonCelula]);

    from(asignacionesCelulasService.addPersonCelula(newPersonCelula))
      .subscribe((personCelula) => {

        // expected value
        expect(personCelula).toEqual(newPersonCelula)


        // expected celulaTo
        expect(personCelula.celulaTo).toEqual(newPersonCelula.celulaTo)

        // expected personTo
        expect(personCelula.personTo).toEqual(newPersonCelula.personTo)

        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })

  it('should return personCelula by ID', (done: DoneCallback) => {

    const id = 5

    const expectedPersonCelula: PersonCelula = {
      "id": id,
      "assignmentStartDate": null,
      "assignmentEndDate": null,
      "tentativeAssignmentEndDate": null,
      "allocationPercentage": null,
      "personTo": {
        "id": 35,
        "name": "María",
        "lastName": "Magdalenaa",
        "email": "maria.magdalena@maria.com",
        "bornDay": null,
        "bornMonth": null,
        "bankEntryDate": "2022-05-17",
        "phoneNumber": "0979125152",
        "codeCountry": "AFG",
        "role": "Staff",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 2,
        "idSeniority": 2,
        ultimatix: 2070048,
      },
      "celulaTo": {
        "id": 24,
        "celulaCreationDate": "2022-03-01",
        "celulaFinishDate": null,
        "celulaNameSquad": "squad",
        "celulaNameProduct": "producto",
        "description": "bgfbgf",
        "idTribu": 2,
        "tribuName": "BUSINESS CAPABILITIES",
        "user": "luischi",
        "state": "ACTIVO"
      },
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.get.mockReturnValueOnce([expectedPersonCelula]);

    from(asignacionesCelulasService.getPersonCelulaById(id))
      .subscribe((personCelula) => {
        // expected value
        expect(personCelula).toEqual(expectedPersonCelula)

        // expected id
        expect(personCelula.id).toEqual(expectedPersonCelula.id)

        // expected celulaTo
        expect(personCelula.celulaTo).toEqual(expectedPersonCelula.celulaTo)

        // expected personTo
        expect(personCelula.personTo).toEqual(expectedPersonCelula.personTo)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return percentage list by person ID', (done: DoneCallback) => {

    const id = 5

    const expectedPersonCelulaPercentage: PersonCelulaPercentage[] = [{
      "celula": "Celula Test 2",
      "allocationPercentage": 100.0
    }]

    httpServiceMock.get.mockReturnValueOnce([expectedPersonCelulaPercentage]);

    from(asignacionesCelulasService.getPercentageListByPersonId(id))
      .subscribe((personCelulaPercentage) => {
        // expected value
        expect(personCelulaPercentage).toEqual(expectedPersonCelulaPercentage)

        // personCelulaPercentage length is expected to be greater than 0
        expect(personCelulaPercentage.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return expected exitList', (done: DoneCallback) => {

    const expectedExitList =
      [
        {
          "id": 1,
          "reasonExit": "Gripe"
        },
        {
          "id": 2,
          "reasonExit": "Renuncia"
        },
        {
          "id": 3,
          "reasonExit": "Cambio"
        },
        {
          "id": 4,
          "reasonExit": "Accidente"
        }
      ]


    httpServiceMock.get.mockResolvedValue(expectedExitList);

    asignacionesCelulasService.getListExit()
      .then((exitList) => {
        expect(exitList.length).toBeGreaterThan(0)
        exitList.forEach((reasonExit) => {
          expect(reasonExit).not.toBeNull()
        })
        done()
      })
    expect(httpServiceMock.get).toHaveBeenCalled();

  })
});
