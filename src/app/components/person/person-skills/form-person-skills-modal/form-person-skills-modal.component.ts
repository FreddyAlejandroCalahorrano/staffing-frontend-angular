import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "@modal/dialog.component";
import {DialogService} from "@modal/dialog.service";
import {Skill} from "@interfaces/skill";
import {PersonSkills} from "@interfaces/personSkills";
import {Person} from "@interfaces/person";
import {SkillsService} from "@services/skills.service";
import {MessageBar} from "@interfaces/messageBar";

export interface ModelDialog {
  title: string,
  skillsCatalog: Skill[],
  selectedPerson: Person,
}

@Component({
  selector: 'app-form-person-skills-modal',
  templateUrl: './form-person-skills-modal.component.html',
  styleUrls: ['./form-person-skills-modal.component.scss']
})
export class FormPersonSkillsModalComponent extends DialogComponent<ModelDialog, MessageBar> implements OnInit {

  title: string;
  skillsCatalog: Skill[]
  selectedPerson: Person

  searchNameSkill: string = ""
  searchTypeSkills: string = ""

  submitSkills: Skill[] = []

  loadingOnSubmit: boolean = false
  columns: any[]

  constructor(
    dialogService: DialogService,
    private _skillService: SkillsService,
  ) {
    super(dialogService)
    this.setConfigTable()
  }

  ngOnInit(): void {
  }

  setConfigTable() {
    this.columns = [
      {
        caption: 'Tipo de Habilidad',
      },
      {
        caption: 'Nombre',
      },
      {
        caption: 'Acciones',
      }
    ]
  }

  handleSelectedItem(event: any) {
    this.searchTypeSkills = event.detail.value
  }

  onClickCheckbox(event: any, skill: Skill) {
    if (event?.detail?.checked) {
      this.submitSkills?.push(skill)
    } else {
      this.submitSkills = this.submitSkills.filter((data) => data.id != skill.id)
    }
  }

  onAddSkills() {
    if (this.submitSkills.length > 0) {
      this.loadingOnSubmit = true
      let personSkills: PersonSkills = {
        personTo: this.selectedPerson,
        skillToList: this.submitSkills,
        user: "nicolasito"
      }
      this._skillService.addPersonSkills(personSkills).then((data) => {
        this.loadingOnSubmit = false
        this.result = {
          status: "success",
          text: "Habilidades actualizadas."
        }
        this.close()
      }).catch(() => {
        this.result = {
          status: "error",
          text: "Error al agregar habilidades."
        }
        this.close()
      })
    }
  }

}
