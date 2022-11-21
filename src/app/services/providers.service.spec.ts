import {ProvidersService} from './providers.service';
import {from} from "rxjs";
import {Provider} from "../types/provider";
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;

describe('ProvidersService', () => {
  let providersService: ProvidersService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    providersService = new ProvidersService(httpServiceMock);
  })

  it('should be created', () => {
    expect(providersService).toBeTruthy();
  });

  it('should return expected providers', (done: DoneCallback) => {

    const expectedProviders: Provider[] = [
      {"id": 3, "providerName": "T-", "user": "luischi", "state": "ACTIVO"},
      {"id": 2, "providerName": "TCS", "user": "luischi", "state": "ACTIVO"}
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedProviders]);

    from(providersService.getProviders())
      .subscribe((providers) => {
        // expected value
        expect(providers).toEqual(expectedProviders)

        // chapters length is expected to be greater than 0
        expect(providers.length).toBeGreaterThan(0)

        providers.forEach((provider) => {
          // ChapterName is expected not to be null
          expect(provider.providerName).not.toBeNull()
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

});
