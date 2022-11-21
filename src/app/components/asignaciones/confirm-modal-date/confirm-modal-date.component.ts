import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {DialogComponent} from "@modal/dialog.component";
import {DialogService} from "@modal/dialog.service";
import {DateValidators} from "../../../validators/date-validators";
import {getToday} from "../../../common/utils/fn";
import {AsignacionesCelulasService} from "@services/asignaciones-celulas.service";

export interface ModelDialog {
  title: string
  possibleCloseDate: string
  showExitReasons?: boolean
}

@Component({
  selector: 'app-confirm-modal-date',
  templateUrl: './confirm-modal-date.component.html',
  styleUrls: ['./confirm-modal-date.component.scss']
})
export class ConfirmModalDateComponent extends DialogComponent<ModelDialog, any> {

  title: string;
  possibleCloseDate: string;
  showExitReasons: boolean;
  exitCloce$: Promise<any[]>

  public assignmentEndDate = new FormControl('', [Validators.required, DateValidators.dateValid])
  public exitCloce = new FormControl('', [Validators.required])
  constructor(
    dialogService: DialogService,
    private asignacionesService: AsignacionesCelulasService,
    ) {
    super(dialogService)
    this.exitCloce$ = this.asignacionesService.getListExit()
  }
  ngOnInit(){
    if(this.possibleCloseDate){
      this.assignmentEndDate.patchValue(this.possibleCloseDate)
    }
    else{
      this.assignmentEndDate.patchValue(getToday())
    }
    if(!this.showExitReasons){
      this.exitCloce.clearValidators()
      this.exitCloce.updateValueAndValidity()
    }
  }

  setResult(result: boolean) {
    this.result = {
      confirm: result,
      ...(
          {assignmentEndDate: this.assignmentEndDate.value}
      ),
      ...(
        {idExit: this.exitCloce.value}
      )
    }
    this.close()
  }

}
