import {TribuService} from './tribu.service';
import {from} from "rxjs";
import {Tribu} from "../types/tribu";
import {generateManyTribu, generateTribu} from "@interfaces/mocks/tribu.mock";
import {TestBed} from "@angular/core/testing";
import {HttpService} from "@pichincha/angular-sdk/http";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;

describe('TribuService', () => {
  let tribuService: TribuService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    TestBed.configureTestingModule({
      providers: [
        TribuService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    })
    tribuService = TestBed.inject(TribuService);
  })

  it('should be created', () => {
    expect(tribuService).toBeTruthy();
  });

  it('should return expected tribus', (done: DoneCallback) => {

    const expectedTribus: Tribu[] = generateManyTribu()

    httpServiceMock.get
      .mockReturnValueOnce([expectedTribus])

    from(tribuService.getTribu())
      .subscribe(tribus => {
        // expected value
        expect(tribus).toEqual(expectedTribus)
        expect(tribus.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should add tribu and return the new tribu', (done: DoneCallback) => {

    const newTribu: Tribu = generateTribu()

    httpServiceMock.post.mockReturnValueOnce([newTribu]);

    from(tribuService.addTribu(newTribu))
      .subscribe((tribu) => {

        // expected value
        expect(tribu).toEqual(newTribu)

        // expected state
        expect(tribu.state).toEqual(newTribu.state)

        // expected celula name
        expect(tribu.tribuName).toEqual(newTribu.tribuName)

        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();
  })

  it('should update tribu (tribuName)', (done: DoneCallback) => {

    const updatedTribu: Tribu = generateTribu()

    httpServiceMock.put.mockReturnValueOnce([updatedTribu]);

    from(tribuService.updateTribu(updatedTribu, updatedTribu.id))
      .subscribe((tribu) => {

        // expected value
        expect(tribu).toEqual(updatedTribu)

        // expected celula name
        expect(tribu.tribuName).toEqual(updatedTribu.tribuName)

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();
  })

  it('should delete tribu', (done: DoneCallback) => {

    const deletedTribu: Tribu = generateTribu()

    httpServiceMock.put.mockReturnValueOnce([deletedTribu]);

    from(tribuService.updateTribu(deletedTribu, deletedTribu.id))
      .subscribe((tribu) => {

        // expected value
        expect(tribu).toEqual(deletedTribu)

        // expected state
        expect(tribu.state).toEqual(deletedTribu.state)

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();
  })

  it('should return if the tribu name is valid', (done: DoneCallback) => {
    const tribuName = "CANALES"
    const expectedResponse: string = "Registro ya existe"

    httpServiceMock.get.mockReturnValueOnce([expectedResponse]);

    from(tribuService.validateTribuName(tribuName))
      .subscribe((response) => {
        // expected value
        expect(
          response
        ).toEqual(expectedResponse)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();
  })

});
