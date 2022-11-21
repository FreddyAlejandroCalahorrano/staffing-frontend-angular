import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {CelulaService} from '@services/celula.service';
import {PersonReportService} from '@services/person-report.service';
import {TribuService} from '@services/tribu.service';

import {PersonReportComponent} from './person-report.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageBarService} from "@services/message-bar.service";
import {ProfilesService} from "@services/profiles.service";
import {CustomCommonModule} from "../../common/components/common.module";
import {first} from "rxjs/operators";
import {ProvidersService} from "@services/providers.service";

describe('PersonReportComponent', () => {
  let component: PersonReportComponent;
  let fixture: ComponentFixture<PersonReportComponent>;

  let mockCelulaService = {
    getCelulaByArrayTribu: jest.fn(),
  }
  let mockPersonReport = {
    getPersonSearchPaged: jest.fn(),
  }
  let mockTribuService = {
    getTribu: jest.fn().mockResolvedValue([]),
  }
  let mockProfileService = {
    getProfiles: jest.fn().mockResolvedValue([]),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        CustomCommonModule,
      ],
      declarations: [PersonReportComponent],
      providers: [
        ProvidersService,
        {provide: CelulaService, useValue: mockCelulaService},
        {provide: PersonReportService, useValue: mockPersonReport},
        {provide: TribuService, useValue: mockTribuService},
        {provide: ProfilesService, useValue: mockProfileService},
        MessageBarService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check initial values form group filters', () => {
    expect(component.tribu.value).toEqual([]);
    expect(component.celula?.value).toEqual([]);
    expect(component.profile?.value).toEqual([]);
    expect(component.filter?.value).toEqual(null);
    expect(component.asignmentStartDate?.get('to')?.value).toEqual(null);
    expect(component.tentativeAsignmentEndDate?.get('from').value).toEqual(null);

  });

  it('should called method "getCelulaByArrayTribu" when change value control tribu', () => {

    const spyCelula = mockCelulaService.getCelulaByArrayTribu
      .mockImplementation(() => Promise.resolve([]))

    component.tribu.setValue([1, 2, 3])
    expect(
      component.celula.value
    ).toHaveLength(0);

    expect(
      spyCelula
    ).toBeCalled()
  })

  it('should called method "getPersonSearchPaged" when emit value BehaviorSubject(dataReport$)', (done) => {
    const spyMethod = mockPersonReport.getPersonSearchPaged
      .mockImplementation(() => Promise.resolve({}))

    component.personReport$
      .pipe(first())
      .subscribe({
        next: () => {


          expect(
            spyMethod
          ).toBeCalled();

          expect(
            component.showPagination
          ).toBeTruthy();

        },
        complete: () => done()
      })

    component.dataReport$.next({size: 0, page: 0})
  })

  it('should called method "next" from [dataReport$] when call onClickSearch', () => {
    const spyNextSubject = jest.spyOn(component.dataReport$, 'next')
    component.onClickSearch()
    expect(
      spyNextSubject
    ).toBeCalled()
    expect(
      component.currentPage
    ).toEqual(1)
  })

  it('should called method "next" from [dataReport$] when call setupPagination', () => {
    const spyNextSubject = jest.spyOn(component.dataReport$, 'next')
    component.setupPagination({sizePage: 5, currentPage: 1, start: 0, end: 0})
    expect(
      spyNextSubject
    ).toBeCalled()
  })

  it('should return value form group filters, valid to query', () => {
    component.filters.patchValue({
      tribu: [1, 2, 3],
      celula: null,
      profile: null,
      asignmentStartDate: {
        from: '2022-05-01',
        to: '2021-12-17',
      },
      tentativeAsignmentEndDate: {
        from: null,
        to: '2022-01-01',
      },
    }, {emitEvent: false})
    const valueForm = component.getFiltersValue()
    expect(
      valueForm.assignmentRange
    ).toEqual({
      from: '2022-05-01',
      to: '2021-12-17',
    })

    expect(
      valueForm.tentativeEndRange
    ).toEqual({
      to: null,
      from: null,
    })

    component.filters.patchValue({
      tentativeAsignmentEndDate: {
        from: '2022-02-10',
        to: '2022-04-30',
      },
    })
    const renewValueForm = component.getFiltersValue()
    expect(
      renewValueForm.tentativeEndRange
    ).toEqual({
      from: '2022-02-10',
      to: '2022-04-30',
    })

  })

  it('should give null in fn[validateDates] if all dates are null', () => {
    let formGroup = new FormGroup({
      'from': new FormControl(null),
      'to': new FormControl(null),
    }, {
      validators: component.validateDates()
    });
    expect(formGroup.hasError('validateDates')).toBeFalsy()
  })

  it('should give required error message in fn[validateDates] if any date is null', () => {
    let formGroup = new FormGroup({
      'from': new FormControl('2022-05-18'),
      'to': new FormControl(null),
    }, {
      validators: component.validateDates()
    });
    expect(formGroup.hasError('validateDates')).toBeTruthy()
  })

  it('should give null in fn[validateDates] if none date is null', () => {
    let formGroup = new FormGroup({
      'from': new FormControl('2022-05-18'),
      'to': new FormControl('2022-05-20'),
    }, {
      validators: component.validateDates()
    });
    expect(formGroup.hasError('validateDates')).toBeFalsy()
  })

  it('should give range error message in fn[validateDates]', () => {
    let formGroup = new FormGroup({
      'from': new FormControl('2022-05-18'),
      'to': new FormControl('2022-05-17'),
    }, {
      validators: component.validateDates()
    });
    expect(formGroup.hasError('validateDates')).toBeTruthy()
  });

  it('should change the state of the variable "checkUnasignedPerson" to 1', () => {
    const data = {
      detail : {
        "checked": true,
        "value": "1"
      }
  }
    component.onClickCheckbox(data)
    expect(component.checkUnasignedPerson).toEqual(1)
  })

});
