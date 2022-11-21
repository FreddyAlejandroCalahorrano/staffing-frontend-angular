import {TestBed} from '@angular/core/testing';

import {MessageBarService} from './message-bar.service';

describe('MessageBarService', () => {
  let service: MessageBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBarService]
    });
    service = TestBed.inject(MessageBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the method [next] from Subject at least 2 times', (done) => {
    const spy = jest.spyOn(service.notificacion$, 'next')
    service.showMessage('Hola', 'success');
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(2)
      done();
    }, 3000);
  });

});
