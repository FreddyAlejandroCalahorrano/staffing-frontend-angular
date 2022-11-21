import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {Person} from "@interfaces/person";
import {Skill} from "@interfaces/skill";
import {DialogService} from "@modal/dialog.service";
import {SkillsService} from "@services/skills.service";
import {ConfirmModalComponent} from "../../../common/components/confirm-modal/confirm-modal.component";
import {FormPersonSkillsModalComponent} from "./form-person-skills-modal/form-person-skills-modal.component";
import {getMessageError} from '../../../common/utils/fn';
import {MessageBarService} from "@services/message-bar.service";
import {MessageBar} from "@interfaces/messageBar";

@Component({
  selector: 'app-person-skills',
  templateUrl: './person-skills.component.html',
  styleUrls: ['./person-skills.component.scss']
})
export class PersonSkillsComponent implements OnInit {

  @Input() selectedPerson: Person

  dataPersonSkills$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  personSkills$: Observable<Skill[]>

  // FILTERS
  searchNameSkill: string = ""
  searchTypeSkills: string = ""

  showSpinner: boolean = false
  columns: any[]

  constructor(
    private skillService: SkillsService,
    private modalBsService: DialogService,
    private messageBarService: MessageBarService
  ) {
    this.setConfigTable()

    this.personSkills$ = this.dataPersonSkills$
      .pipe(
        switchMap(() => this.skillService.getSkillsByPersonId(this.selectedPerson?.id)),
        map(({skillToList}) => {
          if (skillToList) {
            return skillToList
          }
          return []
        }),
        catchError(() => {
          this.showSpinner = true
          return []
        }),
      )
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

  onDeletePersonSkill(skill: Skill) {
    this.modalBsService.addDialog(
      ConfirmModalComponent,
      {title: `¿Está seguro que desea eliminar la skill ${skill?.nameSkill}?`},
    ).subscribe((result: boolean) => {
      if (!result) return
      let deletedPersonSkills = {
        personTo: this.selectedPerson,
        skillTo: skill,
        user: "luischi",
      }
      this.skillService.deletePersonSkill(deletedPersonSkills)
        .then(() => {
          this.dataPersonSkills$.next(false)
          this.setupMessageBar({
            text: `Habilidad ${skill.nameSkill} eliminada con éxito!`,
            status: 'success'
          })
        })
        .catch((err) => {
          this.setupMessageBar({
            text: getMessageError(err.response.data),
            status: "error"
          })
        })
    })
  }

  onAddPersonSkill() {
    this.skillService.getSkillsByProfileId(this.selectedPerson?.idProfile)
      .then((skills) => {
        this.modalBsService.addDialog(
          FormPersonSkillsModalComponent,
          {
            title: 'Agregar Habilidades',
            skillsCatalog: skills,
            selectedPerson: this.selectedPerson,
          },
          {
            size: 'lg',
          }
        ).subscribe((result) => {
          if (!result) return
          this.setupMessageBar({
            text: result.text,
            status: result.status
          })
          this.dataPersonSkills$.next(false)
        })
      })
      .catch((err) => {
        this.messageBarService.showMessage(
          getMessageError(err.response.data),
          'error'
        )
      })
  }

  handleSelectedItem(event: any) {
    this.searchTypeSkills = event.detail.value
  }

  setupMessageBar({text, status}: MessageBar) {
    this.messageBarService.showMessage(text, status)
  }

}


