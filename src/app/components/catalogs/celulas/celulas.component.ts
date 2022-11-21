import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from "@modal/dialog.service";
import {CelulaService} from "@services/celula.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {catchError, switchMap, takeUntil} from "rxjs/operators";
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {FormCelulasModalComponent} from './form-celulas-modal/form-celulas-modal.component';
import {MessageBar} from "@interfaces/messageBar";
import {getMessageError} from '../../../common/utils/fn';
import {MessageBarService} from "@services/message-bar.service";
import {DtColumnInterface} from "@dt-table/interfaces/table.interface";

@Component({
  selector: 'app-celulas',
  templateUrl: './celulas.component.html',
  styleUrls: ['./celulas.component.scss']
})
export class CelulasComponent implements OnInit, OnDestroy {

  data$: Observable<any[]>
  refreshTable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  destroy$: Subject<boolean> = new Subject<boolean>()

  showSpinner: boolean = false
  headers: DtColumnInterface[]

  constructor(private modalBsService: DialogService,
              private celulaService: CelulaService,
              private messageBarService: MessageBarService,) {
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.setConfigTable()
    this.data$ = this.refreshTable$
      .pipe(
        switchMap(() => this.celulaService.getCelulas()),
        takeUntil(this.destroy$),
        catchError(() => {
          this.showSpinner = true
          return []
        }),
      )
  }

  setConfigTable() {
    this.headers = [
      {
        caption: 'Nombre del producto',
        dataField: 'celulaNameProduct',
        search: true
      },
      {
        caption: 'Nombre del squad',
        dataField: 'celulaNameSquad',
        search: true
      },
      {
        caption: 'Tribu',
        dataField: 'tribuName',
        search: true
      },
      {
        caption: 'Descripción',
        dataField: 'description',
      },
      {
        caption: 'Fecha de creación',
        dataField: 'celulaCreationDate',
      },
      {
        caption: 'Fecha de finalización',
        dataField: 'celulaFinishDate',
      },
    ]
  }

  onClickEdit(data?: any) {
    this.modalBsService.addDialog(
      FormCelulasModalComponent,
      {
        titleModal: `${data ? 'Editar' : 'Agregar'} Célula`,
        celula: data,
      },
      {
        size: 'lg',
        modalDialogClass: "modal-dialog-scrollable",
      }
    ).subscribe((result) => {
      if (!result) return
      this.setupMessageBar({status: result.status, text: result.text})
      this.refreshTable$.next(false)
    })
  }

  onDeleteStart(event: any) {
    const {rowData} = event
    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {title: `¿Esta seguro que desea eliminar la célula ${rowData.celulaNameProduct}?`},
    ).subscribe((result: boolean) => {
      if (result) {
        rowData.state = "INACTIVO"
        this.celulaService.updateCelulaById(rowData.id, rowData)
          .then(() => {
            this.setupMessageBar({
              status: "success",
              text: "Célula eliminada exitosamente!"
            })
            this.refreshTable$.next(false)
          })
          .catch((err) => {
            this.setupMessageBar({
              status: "error",
              text: getMessageError(err.response.data)
            })
            this.refreshTable$.next(false)
          })
      }
    })
  }

  setupMessageBar(messageBar: MessageBar) {
    this.messageBarService
      .showMessage(messageBar.text, messageBar.status)
  }

}
