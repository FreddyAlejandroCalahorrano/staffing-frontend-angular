import {Component} from '@angular/core';
import {DialogComponent} from "@modal/dialog.component";
import {DialogService} from "@modal/dialog.service";

export interface ModelDialog {
  title: string
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent extends DialogComponent<ModelDialog, boolean> {
  title: string;

  constructor(
    dialogService: DialogService,
  ) {
    super(dialogService)
  }

  setResult(result: boolean){
    this.result = result
    this.close()
  }

}
