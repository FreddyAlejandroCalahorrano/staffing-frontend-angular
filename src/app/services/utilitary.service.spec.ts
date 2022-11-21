import {UtilitaryService} from './utilitary.service';

describe('UtilitaryService', () => {
  let utilitaryService: UtilitaryService;

  beforeEach(() => {
    utilitaryService = new UtilitaryService();
  })

  it('should be created', () => {
    expect(utilitaryService).toBeTruthy();
  });

});
