import {Component, OnInit} from '@angular/core';
import {MessageBarService, PersonService} from "@services/index";
import {BehaviorSubject, Observable} from "rxjs";
import {catchError, debounceTime, switchMap, tap} from "rxjs/operators";
import {DialogService} from "@modal/dialog.service";
import {ConfirmModalComponent} from "../../common/components/confirm-modal/confirm-modal.component";
import {Router} from "@angular/router";
import {MessageBar} from "../../types/messageBar";
import {PaginationPerson} from "../../types/paginationPerson";
import {FormControl} from "@angular/forms";
import {getMessageError} from '../../common/utils/fn';
import {PaginationEvt} from "@dt-table/interfaces/table.interface";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  showSpinner: boolean = true

  // Filter
  filter: FormControl = new FormControl('')

  // Pagination
  showPagination: boolean = false
  optionSize: number[] = [5, 10, 15, 20, 30, 50, 100]
  currentPage: number = 1
  size: number = 5

  dataPaginationPerson$: BehaviorSubject<{ size: number, page: number }>
    = new BehaviorSubject<{ size: number; page: number }>({page: 1, size: 5})
  paginationPerson$: Observable<PaginationPerson>

  columns: any[]

  constructor(
    private personService: PersonService,
    private modalBsService: DialogService,
    private messageBarService: MessageBarService,
    private router: Router
  ) {
    this.setConfigTable()

    this.paginationPerson$ = this.dataPaginationPerson$
      .pipe(
        switchMap(({size, page}) =>
          this.personService.getPeopleSearchPaged(this.filter.value, page, size, "")),
        tap(() => this.showPagination = true),
        catchError(() => {
          this.showSpinner = !this.showSpinner
          return []
        })
      )

  }

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.dataPaginationPerson$.next({size: 5, page: 1})
        this.currentPage = 1
      })
  }

  setConfigTable() {
    this.columns = [
      {
        caption: 'Apellidos',
      },
      {
        caption: 'Nombres',
      },
      {
        caption: 'Correo Electrónico',
      },
      {
        caption: 'Role',
      },
      {
        caption: 'Perfil',
      },
      {
        caption: 'Acciones',
      },

    ]
  }

  onDeletePersonClick(deletedPerson: any) {
    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {
        title: `¿Está seguro que desea eliminar a ${deletedPerson.name} ${deletedPerson.lastName}?`
      },
    ).subscribe((result: boolean) => {
      if (result) {
        deletedPerson.user = "nicolas"
        deletedPerson.state = "INACTIVO"
        this.personService.updatePerson(deletedPerson, deletedPerson.id)
          .then(() => {
            this.dataPaginationPerson$.next({size: 5, page: 1})
            /*this.currentPage = 1*/
            this.setupMessageBar({
              status: "success",
              text: "Person eliminada con éxito!"
            })
          })
          .catch((err) => {
            this.setupMessageBar({
              status: "error",
              text: getMessageError(err.response.data)
            })
          })
      }
    })
  }

  onEditPersonClick(id: number) {
    this.router.navigate([`personas/editar/${id}`])
      .catch((err) => {
        this.setupMessageBar({
          status: "error",
          text: getMessageError(err.response.data)
        })
      })
  }

  setupPagination(pagination: PaginationEvt) {
    this.dataPaginationPerson$.next({
      size: pagination.sizePage,
      page: pagination.currentPage
    })
  }

  setupMessageBar(messageBar: MessageBar) {
    this.messageBarService
      .showMessage(messageBar.text, messageBar.status)
  }
}
