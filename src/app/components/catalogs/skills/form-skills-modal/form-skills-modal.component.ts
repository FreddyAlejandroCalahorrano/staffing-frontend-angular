import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "@modal/dialog.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "@modal/dialog.service";
import {SkillsService} from "@services/skills.service";
import {Skill} from "@interfaces/skill";
import {MessageBar} from "@interfaces/messageBar";
import {getMessageError} from '../../../../common/utils/fn';
import {ProfilesService} from "@services/profiles.service";
import {Profile} from "@interfaces/profile";

export interface ModelDialog {
  titleModal: string,
  data: any,
}

@Component({
  selector: 'app-form-skills-modal',
  templateUrl: './form-skills-modal.component.html',
  styleUrls: ['./form-skills-modal.component.scss']
})
export class FormSkillsModalComponent extends DialogComponent<ModelDialog, MessageBar> implements OnInit {

  titleModal: string;
  data: Skill
  isEdit: boolean = false
  skillsFormGroup: FormGroup
  listProfile$: Promise<Profile[]>

  constructor(
    dialogService: DialogService,
    private skillsService: SkillsService,
    private formBuilder: FormBuilder,
    private profilesService: ProfilesService,
  ) {
    super(dialogService)
    this.listProfile$ = this.profilesService.getProfiles()
  }

  ngOnInit(): void {
    this.buildForm()
    this.editData()
  }

  editData() {
    if (!this.data) return

    this.isEdit = true
    this.skillsFormGroup.patchValue({
      nameSkill: this.data.nameSkill,
      idProfile: this.data.idProfile,
      user: this.data.user,
      state: this.data.state,
    })
  }

  buildForm() {
    this.skillsFormGroup = this.formBuilder.group({
      nameSkill: ['', [Validators.required, Validators.maxLength(50)]],
      idProfile: ['', [Validators.required]],
      user: ['luischi'],
      state: ['ACTIVO'],
    })
  }

  onSubmit() {
    this.skillsFormGroup.markAllAsTouched()
    if (this.skillsFormGroup.invalid) return;

    let submitSkill: Skill = this.skillsFormGroup.getRawValue()

    const promiseAddEdit = this.isEdit ? this.skillsService.updateSkill(submitSkill, this.data.id) :
      this.skillsService.addSkill(submitSkill)
    promiseAddEdit
      .then(() =>
        this.result = {
          status: "success",
          text: "Registro exitoso!"
        }
      )
      .catch((err) =>
        this.result = {
          status: "error",
          text: getMessageError(err.response.data)
        }
      )
      .finally(() => this.close())
  }

  get nameSkill() {
    return this.skillsFormGroup.get('nameSkill') as FormControl
  }

  get typeSkill() {
    return this.skillsFormGroup.get('idProfile') as FormControl
  }
}
