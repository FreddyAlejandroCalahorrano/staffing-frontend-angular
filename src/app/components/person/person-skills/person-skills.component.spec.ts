import {FilterSkillPipe} from '../../../pipes/filter-skill.pipe';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSkillsComponent} from './person-skills.component';
import {SkillsService} from '@services/skills.service';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';
import {MessageBarService} from "@services/message-bar.service";
import {DialogService} from "@modal/dialog.service";
import {Skill} from "@interfaces/skill";
import {of} from "rxjs";
import {first} from "rxjs/operators";

describe('SkillsPersonasComponent', () => {
  let component: PersonSkillsComponent;
  let fixture: ComponentFixture<PersonSkillsComponent>;
  let mockedMessageService = {
    showMessage: jest.fn()
  }
  let mockedDialogService = {
    addDialog: jest.fn()
  }
  let mockedSkillService = {
    deletePersonSkill: jest.fn(),
    getSkillsByProfileId: jest.fn(),
    getSkillsByPersonId: jest.fn()
      .mockImplementation(() => Promise.resolve({
        "personTo": {
          "id": 19,
          "ultimatix": null,
          "name": "ALBERTO",
          "lastName": "ALBERTO",
          "email": "albeto@gmail.com",
          "bornDay": 28,
          "bornMonth": 2,
          "bankEntryDate": "2022-05-11",
          "phoneNumber": "0983412571",
          "codeCountry": "AND",
          "role": "Staff",
          "user": "luischi",
          "state": "ACTIVO",
          "idProvider": 2,
          "idSeniority": 2
        },
        "skillToList": [
          {"id": 9, "nameSkill": " Skill2", "typeSkill": "DevBack", "user": "luischi", "state": "ACTIVO"},
          {"id": 18, "nameSkill": "APIGEEE", "typeSkill": "DevFront", "user": "luischi", "state": "ACTIVO"}],
        "user": "nicolasito"
      })),
    getTypeSkills: jest.fn()
      .mockImplementation(() => Promise.resolve(["DevBack", "DevFront", "QA"]))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        BootstrapModalModule,
      ],
      declarations: [PersonSkillsComponent, FilterSkillPipe],
      providers: [
        {provide: SkillsService, useValue: mockedSkillService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: DialogService, useValue: mockedDialogService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fn[addDialog] and fn[deletePersonSkill] when fn[onDeletePersonSkill] is executed', () => {
    let deletedSkill: Skill = {
      "id": 1,
      "nameSkill": "NN",
      "typeSkill": "NN",
      "idProfile": null,
      "user": "NN",
      "state": "NN"
    }
    const spyDialogService = mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    const spySkillService = mockedSkillService.deletePersonSkill
      .mockImplementation(() => Promise.resolve({}))

    component.onDeletePersonSkill(deletedSkill)

    expect(spyDialogService).toBeCalled()

    expect(spySkillService).toBeCalled()

  })

  it('should throw error in fn[deletePersonSkill] when fn[onDeletePersonSkill] is executed', () => {
    let messageError = "Error al eliminar habilidad"

    const spyDialogService = mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    const spySkillService = mockedSkillService.deletePersonSkill
      .mockRejectedValue({response: {data: messageError}})

    component.onDeletePersonSkill(null)

    expect(spyDialogService).toBeCalled()

    expect(spySkillService).toBeCalled()
  })

  it('should call fn[getSkillsByProfileId] and fn[addDialog] when fn[onAddPersonSkill] is executed', () => {

    const spySkillService = mockedSkillService.getSkillsByProfileId
      .mockResolvedValue(null)

    const spyDialogService = mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    component.onAddPersonSkill()

    expect(spyDialogService).toBeCalled()

    expect(spySkillService).toBeCalled()

  })

  it('should throw error in fn[getSkillsByProfileId] when fn[onAddPersonSkill] is executed', () => {
    let messageError = "Error al eliminar habilidad"

    const spySkillService = mockedSkillService.getSkillsByProfileId
      .mockRejectedValue({response: {data: messageError}})

    const spyDialogService = mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    component.onAddPersonSkill()

    expect(spyDialogService).toBeCalled()

    expect(spySkillService).toBeCalled()
  })

  it('should called method "getSkillsByPersonId" when emit value BehaviorSubject(dataPersonSkills$)', (done) => {
    const spyMethod = mockedSkillService.getSkillsByPersonId
      .mockImplementation(() => Promise.resolve({}))

    component.personSkills$
      .pipe(first())
      .subscribe({
        next: () => {

          expect(
            spyMethod
          ).toBeCalled();

        },
        complete: () => done()
      })

    component.dataPersonSkills$.next(true)
  })

  it('should throw error in method "getSkillsByPersonId" when emit value BehaviorSubject(dataPersonSkills$)', (done) => {
    const spyMethod = mockedSkillService.getSkillsByPersonId
      .mockRejectedValue({})

    component.personSkills$
      .pipe(first())
      .subscribe({
        error: ()=>{

          expect(
            spyMethod
          ).toBeCalled();
          done()
        },
        complete: () => done(),
      })

    component.dataPersonSkills$.next(true)
  })

  it('should update searchTypeSkills when fn[handleSelectedItem] is executed', () => {
    const event = {
      detail: {label: 'DevBack', value: 'DevBack'}
    }
    component.handleSelectedItem(event)

    expect(component.searchTypeSkills).toEqual(event.detail.value)
  })


});
