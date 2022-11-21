import {CelulaService} from './celula.service';
import {Celula} from "../types/celula";
import {generateCelula, generateManyCelula} from "@interfaces/mocks/celula.mock";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;

describe('CelulaService', () => {
  let celulaService: CelulaService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    celulaService = new CelulaService(httpServiceMock);
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be created', () => {
    expect(celulaService).toBeTruthy();
  });

  it('should return expected celulas', (done: DoneCallback) => {

    const celulaLength: number = 20
    const expectedCelulas: Celula[] = generateManyCelula(celulaLength, {state: 'ACTIVO'})

    httpServiceMock.get.mockResolvedValue(expectedCelulas);

    celulaService.getCelulas()
      .then((celulas) => {
        expect(celulas.every(({state}) => state == "ACTIVO"))
          .toBeTruthy()

        expect(celulas.length)
          .toEqual(celulaLength)

        done()
      })

    expect(httpServiceMock.get)
      .toHaveBeenCalled();

  })

  it('should update celula by ID', (done: DoneCallback) => {

    const updatedCelula: Celula = generateCelula({state: 'ACTIVO'})

    httpServiceMock.put.mockResolvedValue(updatedCelula);

    celulaService.updateCelulaById(updatedCelula.id, updatedCelula)
      .then((celula) => {
        expect(celula.state)
          .toEqual('ACTIVO')

        expect(celula.id)
          .toEqual(updatedCelula.id)

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();
  })

  it('should add celula', (done: DoneCallback) => {

    const newCelula: Celula = generateCelula({state: 'ACTIVO'})

    httpServiceMock.post.mockResolvedValue(newCelula);

    celulaService.addCelula(newCelula)
      .then((celula) => {
        expect(celula.state)
          .toEqual('ACTIVO')
        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();
  })

  it('should return deleted celula with state INACTIVO', (done: DoneCallback) => {

    const deletedCelula: Celula = generateCelula({state: 'INACTIVO'})

    httpServiceMock.put.mockResolvedValue(deletedCelula);

    celulaService.updateCelulaById(deletedCelula.id, deletedCelula)
      .then((celula) => {
        expect(celula.state).toEqual('INACTIVO')
        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();
  })

  it('should return if the celula name product is valid', (done: DoneCallback) => {

    const celulaName = "celula9"
    const expectedResponse: string = "Registro es valido"

    httpServiceMock.get.mockResolvedValue(expectedResponse);

    celulaService.validateCelulaNameProduct(celulaName)
      .then((response)=>{
        expect(response).toEqual(expectedResponse)
        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return array with celula by idTribu', (done) => {
    httpServiceMock.get.mockImplementation(() => Promise.resolve([]))
    celulaService.getCelulaByTribu(9)
      .then(response => {
        done()
        expect(
          Array.isArray(response)
        ).toBeTruthy()
      })
  })

  it('should return array with celula by idTribu array', (done) => {
    httpServiceMock.post.mockImplementation(() => Promise.resolve([]))
    celulaService.getCelulaByArrayTribu([9, 1, 5])
      .then(response => {
        done()
        expect(
          Array.isArray(response)
        ).toBeTruthy()
      })
  })

});
