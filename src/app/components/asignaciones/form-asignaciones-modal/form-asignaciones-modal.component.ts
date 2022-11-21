import {Component, OnInit} from '@angular/core';
import {Person} from '@interfaces/person';
import {DialogComponent} from '@modal/dialog.component';
import {DialogService} from '@modal/dialog.service';
import {FormControl} from "@angular/forms";
import {PaginationPerson} from "@interfaces/paginationPerson";
import {PersonService} from "@services/person.service";
import {BehaviorSubject, Observable} from "rxjs";
import {catchError, debounceTime, switchMap, tap} from "rxjs/operators";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";


export interface ModelDialog {
  titleModal: string,
  personRole: 'Staff' | "Lider"
}

@Component({
  selector: 'app-form-asignaciones-modal',
  templateUrl: './form-asignaciones-modal.component.html',
  styleUrls: ['./form-asignaciones-modal.component.scss']
})
export class FormAsignacionesModalComponent extends DialogComponent<ModelDialog, { person: Person }> implements OnInit {
  titleModal: string
  personRole: 'Staff' | "Lider"

  dataPaginationPerson$: BehaviorSubject<{ size: number, page: number }>
    = new BehaviorSubject<{ size: number; page: number }>({page: 1, size: 5})
  paginationPerson$: Observable<PaginationPerson>

  // Filter
  filter: FormControl = new FormControl('')

  // Pagination
  showPagination: boolean = false
  optionSize: number[] = [5, 10, 15, 20, 30, 50, 100]
  currentPage: number = 1
  size: number = 5

  showSpinner: boolean = true
  columns: any[]

  constructor(
    private personService: PersonService,
    dialogService: DialogService,
  ) {
    super(dialogService)
    this.setConfigTable()
    this.paginationPerson$ = this.dataPaginationPerson$
      .pipe(
        switchMap(({size, page}) =>
          this.personService.getPeopleSearchPaged(this.filter.value, page, size, this.personRole)),
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

  setConfigTable() {
    this.columns = [
      {
        caption: 'Nombre',
      },
      {
        caption: 'Correo Electrónico',
      },
      {
        caption: 'Número Telefónico',
      },
    ]
  }

  registerEvents() {
    this.filter.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.dataPaginationPerson$.next({size: 5, page: 1})
        this.currentPage = 1
      })
  }

  onPersonClick(person: Person) {
    this.result = {
      person
    }
    this.close()
  }

  setupPagination(pagination: PaginationEvt) {
    this.dataPaginationPerson$.next({
      size: pagination.sizePage,
      page: pagination.currentPage
    })
  }

}
