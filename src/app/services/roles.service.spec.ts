import {RolesService} from './roles.service';
import Mocked = jest.Mocked;
import {from} from "rxjs";
import DoneCallback = jest.DoneCallback;

describe('RolesService', () => {
  let rolesService: RolesService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    rolesService = new RolesService(httpServiceMock);
  })

  it('should be created', () => {
    expect(rolesService).toBeTruthy();
  });

  it('should return expected roles', (done: DoneCallback) => {

    const expectedRoles: string[] = ["Staff", "Lider"]

    httpServiceMock.get.mockReturnValueOnce([expectedRoles]);

    from(rolesService.getRole())
      .subscribe((roles) => {
        // expected value
        expect(roles).toEqual(expectedRoles)

        // chapters length is expected to be greater than 0
        expect(roles.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

});
