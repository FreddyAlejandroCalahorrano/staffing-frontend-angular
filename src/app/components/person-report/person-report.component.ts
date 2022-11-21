import {CelulaService, PersonReportService, ProvidersService, TribuService,} from '@services/index';
import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ProfilesService} from "@services/profiles.service";
import {validateDate} from "../../common/utils/validate-date";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";
import {PaginationPersonReport} from "@interfaces/paginationPersonReport";

@Component({
  selector: 'app-person-report',
  templateUrl: './person-report.component.html',
  styleUrls: ['./person-report.component.scss']
})
export class PersonReportComponent implements OnInit {
  showSpinner: boolean = true

  celulas$: Promise<any[]>;
  tribus$: Promise<any[]>
  profiles$: Promise<any[]>
  providers$: Promise<any[]>

  // Filter
  filters: FormGroup

  // Pagination
  showPagination: boolean = false
  optionSize: number[] = [15, 20, 30, 50, 100]
  currentPage: number = 1
  size: number = 30
  checkUnasignedPerson: number = 0

  dataReport$: BehaviorSubject<{ size: number, page: number }>
    = new BehaviorSubject<{ size: number; page: number }>({page: 1, size: 30})
  personReport$: Observable<PaginationPersonReport>

  columns: any[]

  constructor(
    private fb: FormBuilder,
    private _tribuService: TribuService,
    private _celulaService: CelulaService,
    private _profileService: ProfilesService,
    private _providerService: ProvidersService,
    private _personReport: PersonReportService) {

    this.tribus$ = this._tribuService.getTribu()
    this.profiles$ = this._profileService.getProfiles()
    this.providers$ = this._providerService.getProviders()
    this.setConfigFilters()

    this.personReport$ = this.dataReport$
      .pipe(
        debounceTime(300),
        switchMap(({size, page}) =>
          this._personReport.getPersonSearchPaged(page, size, this.getFiltersValue())
        ),
        tap(() => this.showPagination = true),
      )
  }

  setConfigTable() {
    this.columns = [
      {caption: 'Tribu'},
      {caption: 'Líder de Tribu'},
      {caption: 'Líder Técnico Tribu'},
      {caption: 'PO de célula'},
      {caption: 'Nombre de célula'},
      {caption: 'Producto'},
      {caption: 'Nombre de la persona'},
      {caption: 'Correo'},
      {caption: 'Teléfono'},
      {caption: 'Perfil'},
      {caption: 'Proveedor'},
      {caption: 'Tipo'},
      {caption: 'Fecha de ingreso a la celula'},
      {caption: 'Posible fecha de salida de la celula'},
      {caption: '% de asignación'},
      {caption: 'Seniority'},
    ]
  }

  //#region Getters
  get tribu() {
    return this.filters.get('tribu') as FormControl
  }

  get celula() {
    return this.filters.get('celula') as FormControl
  }

  get profile() {
    return this.filters.get('profile') as FormControl
  }

  get filter() {
    return this.filters.get('filter') as FormControl
  }

  get asignmentStartDate() {
    return this.filters.get('asignmentStartDate') as FormGroup
  }

  get tentativeAsignmentEndDate() {
    return this.filters.get('tentativeAsignmentEndDate') as FormGroup
  }

  get provider() {
    return this.filters.get('provider') as FormGroup
  }

  //#endregion

  setConfigFilters() {
    this.filters = this.fb.group({
      tribu: [[]],
      celula: [[]],
      profile: [[]],
      provider: [[]],
      asignmentStartDate: this.fb.group({
        to: [null,],
        from: [null],
      }, {
        validators: this.validateDates()
      }),
      tentativeAsignmentEndDate: this.fb.group({
        to: [null,],
        from: [null,],
      }, {
        validators: this.validateDates()
      }),
      filter: []
    })

    this.registerEvents();
  }

  registerEvents() {
    this.tribu
      .valueChanges
      .subscribe((idTribus) => {
        this.celula.setValue([])
        this.celulas$ = this._celulaService.getCelulaByArrayTribu(idTribus)
      })
  }

  ngOnInit(): void {
    this.setConfigTable()
  }

  onClickSearch() {
    this.dataReport$.next({size: 5, page: 1})
    this.currentPage = 1
  }

  getFiltersValue() {
    const {
      tribu,
      celula,
      profile,
      provider,
      asignmentStartDate,
      tentativeAsignmentEndDate,
      filter
    } = this.filters.getRawValue()

    let filters: any = {
      idTribus: tribu?.length > 0 ? tribu : null,
      idCelulas: celula?.length > 0 ? celula : null,
      idProfiles: profile?.length > 0 ? profile : null,
      idProviders: provider?.length > 0 ? provider : null,
      assigned: this.checkUnasignedPerson,
      assignmentRange: {
        from: null,
        to: null,
      },
      tentativeEndRange: {
        from: null,
        to: null,
      },
      ...({filter})
    }

    const {to, from} = asignmentStartDate
    if (validateDate(to) && validateDate(from))
      filters.assignmentRange = {
        from: from,
        to: to,
      }
    // const {toTentative, fromTentative} = tentativeAsignmentEndDate
    if (validateDate(tentativeAsignmentEndDate.to)
      && validateDate(tentativeAsignmentEndDate.from))
      filters.tentativeEndRange = {
        from: tentativeAsignmentEndDate.from,
        to: tentativeAsignmentEndDate.to,
      }
    return {...filters}
  }

  setupPagination(pagination: PaginationEvt) {
    this.dataReport$.next({
      size: pagination.sizePage,
      page: pagination.currentPage
    })
  }

  validateDates(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const {from, to} = formGroup.value
      if (!to && !from) { //ALL NULL
        return null
      }

      if (!to || !from) { // ANY NULL
        return {validateDates: 'Las fechas deben tener un rango'}
      }

      if (from > to) {
        return {validateDates: 'El rango de las fechas es inválido'}
      }

      return null
    }
  }

  onClickCheckbox(event : any) {
    this.checkUnasignedPerson = event.detail.checked ? 1 : 0
  }

}
