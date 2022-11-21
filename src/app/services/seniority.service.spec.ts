import { SeniorityService } from './seniority.service';
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;
import { of } from 'rxjs';
import { Seniority } from '../types/Seniority';

describe('SeniorityService', () => {
  let seniorityService: SeniorityService;
  let httpServiceMock: Mocked<any> 

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    seniorityService = new SeniorityService(httpServiceMock);
  })

  it('should be created', () => {
    expect(seniorityService).toBeTruthy();
  });

  it('should return expected seniorities', (done: DoneCallback) => {

    const expectedSeniorities: Seniority[] = [
      {"id":1,"seniorityName":"Trainee"},
      {"id":2,"seniorityName":"Junior"},
      {"id":3,"seniorityName":"Semi senior"},
      {"id":4,"seniorityName":"Senior"}
    ]

    httpServiceMock.get.mockReturnValueOnce(of(expectedSeniorities).toPromise())

    seniorityService.getSeniority()
      .then((seniorities: Seniority[]) => {
        // expected value
        expect(seniorities).toEqual(expectedSeniorities)

        // Counties length is expected to be greater than 0
        expect(seniorities.length).toBeGreaterThan(0)

        done()
      })

  })
});
