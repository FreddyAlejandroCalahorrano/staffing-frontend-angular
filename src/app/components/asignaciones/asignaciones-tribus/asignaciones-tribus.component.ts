import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, from, Observable} from "rxjs";
import {catchError, debounceTime, map, switchMap, tap} from "rxjs/operators";
import {TribuService} from "@services/tribu.service";
import {Router} from "@angular/router";
import {DialogService} from "@modal/dialog.service";
import {AsignacionesTribusService} from '@services/asignaciones-tribus.service';
import {getMessageError} from '../../../common/utils/fn';
import {ConfirmModalDateComponent} from '../confirm-modal-date/confirm-modal-date.component';
import {MessageBarService} from "@services/message-bar.service";
import {FormControl} from "@angular/forms";
import {PaginationPersonTribu} from "@interfaces/paginationPersonTribu";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";

@Component({
  selector: 'app-asignaciones-tribus',
  templateUrl: './asignaciones-tribus.component.html',
  styleUrls: ['./asignaciones-tribus.component.scss']
})
export class AsignacionesTribusComponent implements OnInit {

  dataPaginationPersonTribu$: BehaviorSubject<{ size: number, page: number }>
    = new BehaviorSubject<{ size: number; page: number }>({page: 1, size: 5})
  paginationPersonTribu$: Observable<PaginationPersonTribu>

  tribus$: Observable<any[]>

  // Filters
  personFilter: FormControl = new FormControl('')
  tribuFilter: FormControl = new FormControl([0])

  // Pagination
  showPagination: boolean = false
  optionSize: number[] = [5, 10, 15, 20, 30, 50, 100]
  currentPage: number = 1
  size: number = 5

  showSpinner: boolean = true
  columns: any[]


  constructor(
    private asignacionesTribusService: AsignacionesTribusService,
    private tribuService: TribuService,
    private router: Router,
    private modalBsService: DialogService,
    private messageBarService: MessageBarService,) {
    this.setConfigTable()
    this.tribus$ = from(this.tribuService.getTribu())
      .pipe(
        map((tribus) => ([
            {id: 0, tribuName: 'Todas'},
            ...tribus
          ])
        ),
      );

    this.paginationPersonTribu$ = this.dataPaginationPersonTribu$
      .pipe(
        switchMap(({size, page}) =>
          this.asignacionesTribusService.getPersonTribuSearchPaged(
            this.personFilter.value,
            page.toString(),
            size.toString(),
            this.tribuFilter.value == 0 ? '' : this.tribuFilter.value)
        ),
        tap(() => this.showPagination = true),
        catchError(() => {
          this.showSpinner = !this.showSpinner
          return []
        })
      )

  }

  ngOnInit(): void {
    this.registerEvents()
  }

  registerEvents() {
    this.personFilter.valueChanges.pipe(debounceTime(500))
      .subscribe(() => {
        this.dataPaginationPersonTribu$.next({size: 5, page: 1})
        this.currentPage = 1
      })

    this.tribuFilter.valueChanges
      .subscribe(() => {
        this.dataPaginationPersonTribu$.next({size: 5, page: 1})
        this.currentPage = 1
      })
  }

  setConfigTable() {
    this.columns = [
      {
        caption: 'Nombre de tribu',
      },
      {
        caption: 'Nombre del líder',
      },
      {
        caption: 'Tipo de rol',
      },
      {
        caption: 'Fecha de inicio',
      },
      {
        caption: 'Acciones',
      },
      {
        caption: '',
      },
    ]
  }

  onAddOrEditPersonTribu(id?: number) {
    if (id) {
      this.router.navigate([`/asignaciones/tribus/editar/${id}`])
    } else {
      this.router.navigate(['/asignaciones/tribus/crear'])
    }
  }

  onDeletePersonTribuClick(personTribu: any) {
    this.modalBsService.addDialog(
      ConfirmModalDateComponent,
      {
        title: `¿Está seguro que desea cerrar la asignación?`,
        possibleCloseDate: personTribu.assignmentEndDate
      },
    ).subscribe((result: any) => {
      if (!result.confirm) return
      this.asignacionesTribusService.deletePersonTribu(personTribu.id, {assignmentEndDate: result.assignmentEndDate})
        .then(() => {
          this.dataPaginationPersonTribu$.next({size: 5, page: 1})
          this.currentPage = 1
          this.messageBarService.showMessage(
            "Asignación cerrada exitosamente!",
            "success"
          )
        })
        .catch((err) =>
          this.messageBarService.showMessage(
            getMessageError(err.response.data),
            "error"
          )
        )
    })

  }

  setupPagination(pagination: PaginationEvt) {
    this.dataPaginationPersonTribu$.next({
      size: pagination.sizePage,
      page: pagination.currentPage
    })
  }

}
