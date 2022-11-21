import {CountryService} from './country.service';
import Mocked = jest.Mocked;
import DoneCallback = jest.DoneCallback;
import {Country} from "../types/country";
import {of} from "rxjs";

describe('CountryService', () => {
  let countryService: CountryService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    countryService = new CountryService(httpServiceMock);
  })

  it('should be created', () => {
    expect(countryService).toBeTruthy();
  });

  it('should return expected countries', (done: DoneCallback) => {

    const expectedCountries: Country[] = [
      {"code": "ECU", "description": "Ecuador"},
      {"code": "AND", "description": "Andorra"},
      {"code": "ARE", "description": "Emiratos Árabes Unidos"},
      {"code": "AFG", "description": "Afganistán"},
      {"code": "ATG", "description": "Antigua y Barbuda"},
      {"code": "AIA", "description": "Anguila"},
      {"code": "ALB", "description": "Albania"},
      {"code": "ARM", "description": "Armenia"},
      {"code": "ANT", "description": "Antillas Neerlandesas"},
      {"code": "AGO", "description": "Angola"},
      {"code": "ATA", "description": "Antártida"},
      {"code": "ARG", "description": "Argentina"},
      {"code": "ASM", "description": "Samoa Americana"},
      {"code": "AUT", "description": "Austria"},
      {"code": "AUS", "description": "Australia"},
      {"code": "ABW", "description": "Aruba"},
      {"code": "ALA", "description": "Islas Áland"},
      {"code": "AZE", "description": "Azerbaiyán"},
      {"code": "BIH", "description": "Bosnia y Herzegovina"},
      {"code": "BRB", "description": "Barbados"},
      {"code": "BGD", "description": "Bangladesh"},
      {"code": "BEL", "description": "Bélgica"},
      {"code": "BFA", "description": "Burkina Faso"},
      {"code": "BGR", "description": "Bulgaria"},
      {"code": "BHR", "description": "Bahréin"},
      {"code": "BDI", "description": "Burundi"}
    ]

    httpServiceMock.get.mockReturnValueOnce(of(expectedCountries).toPromise())

    countryService.getCountry()
      .then((countries: Country[]) => {
        // expected value
        expect(countries).toEqual(expectedCountries)

        // Counties length is expected to be greater than 0
        expect(countries.length).toBeGreaterThan(0)

        done()
      })

  })

});
