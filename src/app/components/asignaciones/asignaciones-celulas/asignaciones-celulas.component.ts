import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {catchError, debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {DialogService} from '@modal/dialog.service';
import {AsignacionesCelulasService, CelulaService, MessageBarService} from '@services/index';
import {MessageBar} from "@interfaces/messageBar";
import {PaginationPersonCelula} from "@interfaces/paginationPersonCelula";
import {FormControl} from "@angular/forms";
import {getMessageError} from '../../../common/utils/fn';
import {ConfirmModalDateComponent} from "../confirm-modal-date/confirm-modal-date.component";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";

@Component({
  selector: 'app-asignaciones-celulas',
  templateUrl: './asignaciones-celulas.component.html',
  styleUrls: ['./asignaciones-celulas.component.scss']
})
export class AsignacionesCelulasComponent implements OnInit {

  dataPaginationPersonCelula$: BehaviorSubject<{ size: number, page: number }>
    = new BehaviorSubject<{ size: number; page: number }>({page: 1, size: 5})
  paginationPersonCelula$: Observable<PaginationPersonCelula>

  celulas$: Observable<any[]>

  // Filters
  personFilter: FormControl = new FormControl('')
  celulaFilter: FormControl = new FormControl('0')

  // Pagination
  showPagination: boolean = false
  optionSize: number[] = [5, 10, 15, 20, 30, 50, 100]
  currentPage: number = 1
  size: number = 5

  showSpinner: boolean = true
  columns: any[]

  constructor(
    private asignacionesCelulasService: AsignacionesCelulasService,
    private celulaService: CelulaService,
    private router: Router,
    private modalBsService: DialogService,
    private messageBarService: MessageBarService,) {

    this.celulas$ = from(this.celulaService.getCelulas())
      .pipe(
        map((celulas) => ([
          {id: 0, celulaNameProduct: "Todas"},
          ...celulas,
        ])),
      )

    this.paginationPersonCelula$ = this.dataPaginationPersonCelula$
      .pipe(
        switchMap(({size, page}) =>
          this.asignacionesCelulasService.getPersonCelulaSearchPaged(
            this.personFilter.value,
            page,
            size,
            this.celulaFilter.value == 0 ? null : this.celulaFilter.value)
        ),
        tap(() => this.showPagination = true),
        catchError(() => {
          this.showSpinner = !this.showSpinner
          return []
        })
      )

    this.setConfigTable()
  }

  ngOnInit(): void {
    /*this.paginationPersonCelula$ = this.getPaginationPersonCelula()*/
    this.registerEvents()
  }

  registerEvents() {
    this.personFilter
      .valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.dataPaginationPersonCelula$.next({size: 5, page: 1})
        this.currentPage = 1
      })

    this.celulaFilter
      .valueChanges
      .subscribe((value) => {
        this.dataPaginationPersonCelula$.next({size: 5, page: 1})
        this.currentPage = 1
      })
  }

  setConfigTable() {
    this.columns = [
      {
        caption: 'Nombre de celula',
      },
      {
        caption: 'Nombre del recurso',
      },
      {
        caption: 'Fecha de ingreso',
      },
      {
        caption: 'Fecha de posible salida',
      },
      {
        caption: 'Porcentaje de asignación',
      },
      {
        caption: 'Acciones',
      },
    ]
  }

  onAddPersonCelulaClick() {
    this.router.navigate(['/asignaciones/celulas/crear'])
  }

  onEditPersonCelulaClick(id: number) {
    this.router.navigate([`/asignaciones/celulas/editar/${id}`])
  }

  onDeletePersonCelulaClick(personCelula: any) {

    this.modalBsService.addDialog(
      ConfirmModalDateComponent,
      {
        title: `¿Está seguro que desea cerrar la asignación?`,
        possibleCloseDate: personCelula.tentativeAssignmentEndDate,
        showExitReasons: true
      },
    ).subscribe((result: any) => {
      if (!result.confirm) return
      this.asignacionesCelulasService.deletePersonCelula(personCelula.id, {
        assignmentEndDate: result.assignmentEndDate,
        idExit: result.idExit
      })
        .then(() => {
          this.dataPaginationPersonCelula$.next({size: 5, page: 1})
          this.currentPage = 1
          this.setupMessageBar({
            status: "success",
            text: "Asignación cerrada exitosamente!"
          })
        })
        .catch((err) => {
          this.setupMessageBar({
            status: "error",
            text: getMessageError(err.response.data)
          })
        })
    })

  }

  setupPagination(pagination: PaginationEvt) {
    this.dataPaginationPersonCelula$.next({
      size: pagination.sizePage,
      page: pagination.currentPage
    })
  }

  setupMessageBar({text, status}: MessageBar) {
    this.messageBarService.showMessage(text, status)
  }

}

