import {Component, OnDestroy, OnInit} from '@angular/core';
import {Skill} from "@interfaces/skill";
import {DialogService} from "@modal/dialog.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {catchError, switchMap, takeUntil} from "rxjs/operators";
import {FormSkillsModalComponent} from "./form-skills-modal/form-skills-modal.component";
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {MessageBar} from "@interfaces/messageBar";
import {getMessageError} from '../../../common/utils/fn';
import {DtColumnInterface} from "@dt-table/interfaces/table.interface";
import {MessageBarService, SkillsService} from "@services/index";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  showSpinner: boolean = false

  headers: DtColumnInterface[]
  data$: Observable<Skill[]>
  refreshTable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private modalBsService: DialogService,
              private skillService: SkillsService,
              private messageBarService: MessageBarService,) {
  }

  ngOnInit(): void {
    this.setConfigTable()

    this.data$ = this.refreshTable$
      .pipe(
        switchMap(() => this.skillService.getSkills()),
        takeUntil(this.destroy$),
        catchError(() => {
          this.showSpinner = true
          return []
        })
      )
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  setConfigTable() {
    this.headers = [
      {
        caption: 'Nombre',
        dataField: 'nameSkill',
        search: true,
      },
      {
        caption: 'Tipo',
        dataField: 'typeSkill',
        search: true,
      }
    ]
  }

  onEditRow(data?: any) {
    this.modalBsService.addDialog(
      FormSkillsModalComponent,
      {
        titleModal: data ? 'Editar Habilidad' : 'Agregar Habilidad',
        data
      },
    ).subscribe((result) => {
      if (!result) return
      this.setupMessageBar(result)
      this.refreshTable$.next(false)
    })
  }

  onDelete(event: any) {
    const {rowData} = event
    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {title: `¿Esta seguro que desea eliminar la habilidad ${rowData.nameSkill}?`},
    ).subscribe((result) => {
      if (result) {
        rowData.state = "INACTIVO"
        this.skillService.updateSkill(rowData, rowData.id)
          .then(() => {
            this.showSpinner = false
            this.setupMessageBar({
              status: "success",
              text: "Habilidad eliminada exitosamente!"
            })
            this.refreshTable$.next(false)
          })
          .catch((err) => {
            this.showSpinner = false
            this.setupMessageBar({
              status: "error",
              text: getMessageError(err.response.data)
            })
            this.refreshTable$.next(false)
          })
      }
    })
  }

  setupMessageBar({text, status}: MessageBar) {
    this.messageBarService.showMessage(text, status)
  }

}

