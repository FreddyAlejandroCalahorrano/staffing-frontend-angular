import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';
import {FilterSkillPipe} from '../../../../pipes/filter-skill.pipe';
import {SkillsService} from '@services/skills.service';

import {FormPersonSkillsModalComponent} from './form-person-skills-modal.component';
import {Skill} from "@interfaces/skill";

describe('FormSkillsPersonasModalComponent', () => {
  let component: FormPersonSkillsModalComponent;
  let fixture: ComponentFixture<FormPersonSkillsModalComponent>;

  let mockedSkillsService = {
    addPersonSkills: jest.fn()
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BootstrapModalModule,
      ],
      declarations: [FormPersonSkillsModalComponent, FilterSkillPipe],
      providers: [
        {provide: SkillsService, useValue: mockedSkillsService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonSkillsModalComponent);
    component = fixture.componentInstance;
    component.skillsCatalog = []
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should update searchTypeSkills when handleSelectedItem method is called', () => {
    const event = {
      detail: {label: 'DevBack', value: 'DevBack'}
    }
    component.handleSelectedItem(event)

    expect(component.searchTypeSkills).toEqual(event.detail.value)
  })

  it('should add skill on submitSkills when onClickCheckbox method is called ', () => {
    const newSkill: Skill = {
      "id": 9,
      "nameSkill": " Skill2",
      "typeSkill": "DevBack",
      "idProfile": 5,
      "user": "luischi",
      "state": "ACTIVO"
    }
    const event = {
      detail: {checked: true, value: '9'}
    }
    component.onClickCheckbox(event, newSkill)
    expect(component.submitSkills.find(({id}) => id == newSkill.id)).toEqual(newSkill)
  })

  it('should remove skill on submitSkills when onClickCheckbox method is called ', () => {
    const skills = [
      {
        "id": 9,
        "nameSkill": " Skill2",
        "typeSkill": "DevBack",
        "idProfile": 6,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 11,
        "nameSkill": ".net core",
        "typeSkill": "DevBack",
        "idProfile": 7,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 15,
        "nameSkill": ".Net Framework",
        "typeSkill": "QA",
        "idProfile": 8,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]
    component.submitSkills = skills
    const removedSkill: Skill = skills[0]
    const event = {
      detail: {checked: false, value: removedSkill.id}
    }
    component.onClickCheckbox(event, removedSkill)
    expect(component.submitSkills.find(({id}) => id == removedSkill.id)).toBeUndefined()
  })

  it('should call addPersonSkills method when skills are added to a person', () => {
    component.selectedPerson = {
      "id": 14,
      "ultimatix": 2070049,
      "name": "Andreshinos",
      "lastName": "Cajamanrca",
      "email": "acajamarca@hotmail.com",
      "bornDay": 0,
      "bornMonth": 0,
      "bankEntryDate": null,
      "phoneNumber": null,
      "codeCountry": "ECU",
      "role": "Staff",
      "user": "luischi",
      "state": "ACTIVO",
      "idProvider": 2,
      "idSeniority": 4
    }
    component.submitSkills = [
      {
        "id": 18,
        "nameSkill": "APIGEEE",
        "typeSkill": "DevFront",
        "idProfile": 9,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 33,
        "nameSkill": "Bancs",
        "typeSkill": "DevBack",
        "idProfile": 10,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]
    const spy = jest.spyOn(mockedSkillsService, 'addPersonSkills')
      .mockImplementation(() => Promise.resolve());
    component.onAddSkills()
    expect(spy).toBeCalled()
  })

  it('should throw a catch error in the addPersonSkills method when a repeated skill is added to a person', () => {
    component.selectedPerson = {
      "id": 14,
      "ultimatix": 2070049,
      "name": "Andreshinos",
      "lastName": "Cajamanrca",
      "email": "acajamarca@hotmail.com",
      "bornDay": 0,
      "bornMonth": 0,
      "bankEntryDate": null,
      "phoneNumber": null,
      "codeCountry": "ECU",
      "role": "Staff",
      "user": "luischi",
      "state": "ACTIVO",
      "idProvider": 2,
      "idSeniority": 4
    }
    component.submitSkills = [
      {
        "id": 18,
        "nameSkill": "APIGEEE",
        "typeSkill": "DevFront",
        "idProfile": 11,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]
    const spy = jest.spyOn(mockedSkillsService, 'addPersonSkills')
      .mockRejectedValue(() => Promise.resolve());
    component.onAddSkills()
    expect(spy).toBeCalled()
  })

});
