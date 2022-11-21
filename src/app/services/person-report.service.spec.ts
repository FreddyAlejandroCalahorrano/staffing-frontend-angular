import {TestBed} from '@angular/core/testing';

import {PersonReportService} from './person-report.service';
import {HttpModule} from "@pichincha/angular-sdk/http";

describe('PersonReportService', () => {
  let service: PersonReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule.forRoot({})],
      providers: [PersonReportService]
    });
    service = TestBed.inject(PersonReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
