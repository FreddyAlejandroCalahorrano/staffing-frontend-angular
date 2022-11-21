import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormTribusModalComponent} from './form-tribus-modal/form-tribus-modal.component';
import {Tribu} from '@interfaces/tribu';
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {DialogService} from '@modal/dialog.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {getMessageError} from '../../../common/utils/fn';
import {DtColumnInterface} from "@dt-table/interfaces/table.interface";
import {MessageBarService, TribuService} from '@services/index'

@Component({
  selector: 'app-tribus',
  templateUrl: './tribus.component.html',
  styleUrls: ['./tribus.component.scss']
})
export class TribusComponent implements OnInit, OnDestroy {
  showSpinner: boolean = false

  tableHeaders: DtColumnInterface[] = []

  data$: Observable<Tribu[]>
  refreshTable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private _TribusServices: TribuService,
              private modalBsService: DialogService,
              private messageBarService: MessageBarService,) {
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  ngOnInit() {
    this.configTable()
    this.data$ = this.refreshTable$
      .pipe(
        switchMap(() => this._TribusServices.getTribu()),
        takeUntil(this.destroy$),
        catchError(() => {
          this.showSpinner = true
          return []
        }),
      )
  }

  configTable() {
    this.tableHeaders = [
      {dataField: 'tribuName', caption: 'Nombre', search: true,},
      {dataField: 'tribuCreationDate', caption: 'Fecha de creación'},
      {dataField: 'tribuFinishDate', caption: 'Fecha de finalización'},
      {dataField: 'description', caption: 'Descripción'},
    ]
  }

  onClickEdit(rowData?: any) {
    this.modalBsService.addDialog(
      FormTribusModalComponent,
      {
        titleModal: `${rowData ? 'Editar' : 'Crear'} Tribu`,
        data: rowData
      },
      {size: 'lg'}
    ).subscribe((result) => {
      if (!result) return
      this.messageBarService.showMessage(
        result.text,
        result.status
      )
      if (result.status == "success")
        this.refreshTable$.next(false)
    })
  }

  onDeleteTable(evt: any) {
    const {rowData} = evt
    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {title: `¿Esta seguro que desea eliminar la tribu ${rowData.tribuName}?`},
    ).subscribe((result: boolean) => {
      if (!result) return

      rowData.state = "INACTIVO"
      this._TribusServices.updateTribu(rowData, rowData.id)
        .then(() => {
          this.refreshTable$.next(false)
          this.messageBarService.showMessage(
            "Tribu eliminada exitosamente!",
            "success",
          )
        })
        .catch((err) => {
          this.messageBarService.showMessage(
            getMessageError(err.response.data),
            "error"
          )
        })

    })
  }

}
